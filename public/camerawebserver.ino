#include "esp_camera.h"
#include "img_converters.h"
#include <WiFi.h>

#include <CameraWebServer_inferencing.h>
#include "edge-impulse-sdk/dsp/image/image.hpp"

#include "board_config.h"

// ===========================
// WiFi
// ===========================
const char *ssid = "YOUR_WIFI_NAME";
const char *password = "YOUR_WIFI_PASSWORD";

// ===========================
// Camera web server
// ===========================
void startCameraServer();

// ===========================
// Edge Impulse variables
// ===========================
static bool debug_nn = false;
static uint8_t *snapshot_buf = nullptr;

// ===========================
// AI function prototypes
// ===========================
void aiTask(void *pvParameters);
bool run_ai_once();
bool capture_image_for_ai(uint32_t img_width, uint32_t img_height);
static int ei_camera_get_data(size_t offset, size_t length, float *out_ptr);

void setup() {
  Serial.begin(115200);
  delay(2000);

  Serial.println();
  Serial.println("Booting CameraWebServer + Edge Impulse AI...");

  // ===========================
  // Camera configuration
  // ===========================
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;

  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;

  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;

  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;

  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;

  config.xclk_freq_hz = 10000000;
  config.frame_size = FRAMESIZE_QVGA;
  config.pixel_format = PIXFORMAT_JPEG;

  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  if (psramFound()) {
    config.jpeg_quality = 10;
    config.fb_count = 2;
    config.grab_mode = CAMERA_GRAB_LATEST;
  } else {
    config.frame_size = FRAMESIZE_QVGA;
    config.fb_location = CAMERA_FB_IN_DRAM;
  }

  // ===========================
  // Init camera
  // ===========================
  esp_err_t err = esp_camera_init(&config);

  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x\n", err);
    return;
  }

 sensor_t *s = esp_camera_sensor_get();

if (s->id.PID == OV3660_PID) {
  s->set_vflip(s, 1);
}

s->set_brightness(s, 0);
s->set_contrast(s, 0);
s->set_saturation(s, 0);

s->set_whitebal(s, 1);
s->set_awb_gain(s, 1);
s->set_exposure_ctrl(s, 1);
s->set_gain_ctrl(s, 1);

s->set_framesize(s, FRAMESIZE_QVGA);

  Serial.println("Camera initialized");

  // ===========================
  // Static IP
  // ===========================
  IPAddress local_IP(10, 0, 0, 150);
  IPAddress gateway(10, 0, 0, 1);
  IPAddress subnet(255, 255, 255, 0);
  IPAddress primaryDNS(8, 8, 8, 8);
  IPAddress secondaryDNS(8, 8, 4, 4);

  WiFi.mode(WIFI_STA);
  WiFi.persistent(false);
  WiFi.disconnect(true, true);
  delay(1000);

  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("WiFi config failed");
  }

  WiFi.setSleep(false);
  WiFi.begin(ssid, password);

  Serial.print("WiFi connecting");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected");

  // ===========================
  // Start web stream
  // ===========================
  startCameraServer();

  Serial.print("Camera Ready! Use 'http://");
  Serial.print(WiFi.localIP());
  Serial.println("' to connect");

  // ===========================
  // Start AI task
  // ===========================
  xTaskCreatePinnedToCore(
    aiTask,
    "AI Task",
    12288,
    NULL,
    1,
    NULL,
    1
  );

  Serial.println("AI task started");
}

void loop() {
  delay(10000);
}

// ===========================
// AI task runs every 3 seconds
// ===========================
void aiTask(void *pvParameters) {
  delay(5000);

  while (true) {
    run_ai_once();
    delay(8000);
  }
}

// ===========================
// Run one AI prediction
// ===========================
bool run_ai_once() {
  ei::signal_t signal;
  signal.total_length = EI_CLASSIFIER_INPUT_WIDTH * EI_CLASSIFIER_INPUT_HEIGHT;
  signal.get_data = &ei_camera_get_data;

  if (!capture_image_for_ai(EI_CLASSIFIER_INPUT_WIDTH, EI_CLASSIFIER_INPUT_HEIGHT)) {
    Serial.println("Failed to capture image for AI");
    return false;
  }

  ei_impulse_result_t result = { 0 };

  EI_IMPULSE_ERROR err = run_classifier(&signal, &result, debug_nn);

  if (err != EI_IMPULSE_OK) {
    Serial.printf("ERR: Failed to run classifier (%d)\n", err);

    if (snapshot_buf != nullptr) {
      free(snapshot_buf);
      snapshot_buf = nullptr;
    }

    return false;
  }

  Serial.printf("\nPredictions, DSP: %d ms, Classification: %d ms\n",
                result.timing.dsp,
                result.timing.classification);

#if EI_CLASSIFIER_OBJECT_DETECTION == 1
  Serial.println("Object detection model detected, but this code is for classification.");
#else
  float best_value = 0.0;
float second_value = 0.0;
const char *best_label = "unknown";

for (uint16_t i = 0; i < EI_CLASSIFIER_LABEL_COUNT; i++) {
  float value = result.classification[i].value;
  const char *label = ei_classifier_inferencing_categories[i];

  Serial.printf("  %s: %.5f\n", label, value);

  if (value > best_value) {
    second_value = best_value;
    best_value = value;
    best_label = label;
  } else if (value > second_value) {
    second_value = value;
  }
}

float threshold = 0.90;
float margin = best_value - second_value;

if (strcmp(best_label, "background") == 0) {
  Serial.printf("BEST: background / nothing | confidence: %.2f | margin: %.2f\n", best_value, margin);
}
else if (best_value < threshold || margin < 0.30) {
  Serial.printf("BEST: uncertain / nothing | confidence: %.2f | margin: %.2f\n", best_value, margin);
}
else {
  Serial.printf("BEST: %s | confidence: %.2f | margin: %.2f\n", best_label, best_value, margin);
}
#endif

  if (snapshot_buf != nullptr) {
    free(snapshot_buf);
    snapshot_buf = nullptr;
  }

  return true;
}

// ===========================
// Capture image from CameraWebServer camera
// Convert JPEG to RGB888
// Resize to Edge Impulse input size
// ===========================
bool capture_image_for_ai(uint32_t img_width, uint32_t img_height) {
  camera_fb_t *fb = esp_camera_fb_get();

  if (!fb) {
    Serial.println("Camera capture failed");
    return false;
  }

  uint32_t raw_width = fb->width;
  uint32_t raw_height = fb->height;
  size_t raw_size = raw_width * raw_height * 3;

  snapshot_buf = (uint8_t *)ps_malloc(raw_size);

  if (snapshot_buf == nullptr) {
    Serial.println("ERR: Failed to allocate snapshot buffer");
    esp_camera_fb_return(fb);
    return false;
  }

  bool converted = fmt2rgb888(fb->buf, fb->len, PIXFORMAT_JPEG, snapshot_buf);

  esp_camera_fb_return(fb);

  if (!converted) {
    Serial.println("Conversion failed");
    free(snapshot_buf);
    snapshot_buf = nullptr;
    return false;
  }

  if ((raw_width != img_width) || (raw_height != img_height)) {
    ei::image::processing::resize_image(
  snapshot_buf,
  raw_width,
  raw_height,
  snapshot_buf,
  img_width,
  img_height,
  3
);
  }

  return true;
}

// ===========================
// Feed image pixels to Edge Impulse
// ===========================
static int ei_camera_get_data(size_t offset, size_t length, float *out_ptr) {
  size_t pixel_ix = offset * 3;
  size_t pixels_left = length;
  size_t out_ptr_ix = 0;

  while (pixels_left != 0) {
    uint8_t r = snapshot_buf[pixel_ix + 0];
    uint8_t g = snapshot_buf[pixel_ix + 1];
    uint8_t b = snapshot_buf[pixel_ix + 2];

    out_ptr[out_ptr_ix] = (r << 16) + (g << 8) + b;

    out_ptr_ix++;
    pixel_ix += 3;
    pixels_left--;
  }

  return 0;
}