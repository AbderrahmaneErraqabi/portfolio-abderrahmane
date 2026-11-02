export const CV_URL = "/English%20cv%20of%20Abderrahmane%20Er-Raqabi.pdf"
export const CV_DOWNLOAD_NAME = "Abderrahmane_Er-Raqabi_CV_English.pdf"
export const PORTRAIT_URL = "/photo%20officielle%20esteban.png"

export type Project = {
  slug: string
  title: string
  summary: string
  date: string
  status?: string
  technologies: string[]
  href: string
  github?: string
}

export const projects: Project[] = [
  { slug: "esp32-s3zero", title: "ESP32-S3Zero", summary: "A modular multi-interface embedded platform with a power-aware firmware architecture.", date: "2026 — ongoing", status: "Hardware build in progress", technologies: ["ESP32-S3", "FreeRTOS", "Wi-Fi / BLE", "NFC", "LoRa"], href: "/projects/esp32-s3zero" },
  { slug: "frequency-multiplexed-analog-system", title: "Frequency-Multiplexed Analog System", summary: "Two audio signals and a control signal sharing one line through designed filters and modulation stages.", date: "2026", technologies: ["Analog electronics", "LTspice", "Filtering", "Signal processing"], href: "/projects/frequency-multiplexed-analog-system" },
  { slug: "esp32-ai-camera-web-server", title: "ESP32 AI Camera Web Server", summary: "Image acquisition, local video streaming, and quantized int8 Edge Impulse inference on an ESP32 camera.", date: "2026", technologies: ["ESP32", "Edge Impulse", "Python", "Computer vision"], href: "/projects/esp32-ai-camera-web-server", github: "https://github.com/AbderrahmaneErraqabi/ESP32-AI-Camera-WebServer" },
  { slug: "medbot", title: "MedBot", summary: "An Arduino prototype coordinating reminders, user input, feedback, and automated pill dispensing.", date: "StarHack 2026", technologies: ["Arduino", "RTC", "LCD", "Servo", "Keypad"], href: "/projects/medbot", github: "https://github.com/AnisLalaoui/Starhack-2026" },
  { slug: "am-radio-receiver", title: "AM Radio Receiver", summary: "A tuned loop antenna, envelope detector, and LM386 amplifier covering the 540–1600 kHz broadcast band.", date: "2026", technologies: ["Analog electronics", "LC resonance", "1N34A", "LM386"], href: "/projects/am-radio-receiver", github: "https://github.com/AbderrahmaneErraqabi/am-radio-receiver" },
  { slug: "automation-flip-flops", title: "ELE1001 — BCD Keypad Interface", summary: "A 4×4 keypad interface producing BCD outputs and synchronization signals for external logic.", date: "2025", technologies: ["Arduino", "Digital logic", "BCD", "Prototyping"], href: "/projects/automation-flip-flops", github: "https://github.com/AbderrahmaneErraqabi/ELE1001-Keypad-7Segment-System" },
  { slug: "esteban-electronics", title: "Esteban Solar Car Electronics", summary: "Team work on embedded electronics, schematics, PCBs, power systems, wiring, and validation.", date: "Aug 2025 — present", technologies: ["PCB design", "Power systems", "Wiring", "Validation"], href: "/projects/esteban-electronics" },
  { slug: "personal-investing-dashboard", title: "RegulAI — Portfolio Intelligence", summary: "A datathon interface for document analysis, financial enrichment, and portfolio-oriented insights.", date: "PolyFinances Datathon 2025", technologies: ["React", "AWS", "Bedrock", "Yahoo Finance"], href: "/projects/personal-investing-dashboard", github: "https://github.com/AbderrahmaneErraqabi/RegulAi" },
]

export type Experience = {
  date: string
  role: string
  organization: string
  description: string
  technologies: string[]
  project?: string
  details?: string
}

export const experience: Experience[] = [
  { date: "Aug 2025 — present", role: "Electronics / PCB Team", organization: "Project Esteban, Polytechnique Montréal", description: "Design and integration of embedded electronics for a solar car, including schematics, PCBs, power systems, wiring, and hardware validation.", technologies: ["PCB design", "Power systems", "Wiring", "Validation"], project: "/projects/esteban-electronics" },
  { date: "Jan 2026 — present", role: "VP External Relations", organization: "GDG Polytechnique Montréal", description: "Build external relationships, coordinate partnerships, and help connect the student developer community with technical events and industry.", technologies: ["Partnerships", "Events", "Communications"] },
  { date: "Aug 2025 — present", role: "Private Tutor — Mathematics and Physics", organization: "Private tutoring", description: "Tutor secondary-school to university students with an emphasis on problem solving and conceptual understanding.", technologies: ["Mathematics", "Physics", "Tutoring"] },
  { date: "May 2026 — Aug 2026", role: "Scientific Intern — Water Quality Screening", organization: "City of Montréal", description: "Performed over 300 field analyses using sampling, Kemio electrochemical measurements, interpretation, and data compilation.", technologies: ["Instrumentation", "Electrochemical measurement", "Data compilation"] },
  { date: "Jun 2023 — present", role: "Sales Manager", organization: "SoftMoc", description: "Supervise a team, monitor performance, and support operations in a high-volume retail environment.", technologies: ["Team supervision", "Operations"] },
]

export const skillGroups = [
  ["Languages", "C/C++ · Python · MATLAB · Rust"],
  ["Embedded platforms & runtime", "ESP32 / ESP32-S3 · STM32 · Arduino · Raspberry Pi · FreeRTOS"],
  ["Interfaces & communication", "SPI · I²C · UART · CAN · Wi-Fi · BLE · NFC/RFID · LoRa/Sub-GHz · PWM · ADC"],
  ["Engineering tools", "LTspice · MATLAB/Simulink · KiCad · AutoCAD Electrical · RapidHarness · Git/GitHub"],
  ["Core work", "Circuit and PCB design · instrumentation · analog filtering · wiring · embedded integration and validation"],
  ["Interests", "Embedded systems · power electronics · control · RF · signal processing · embedded AI"],
]

export const education = [
  ["2025 — present", "Bachelor of Electrical Engineering", "Polytechnique Montréal"],
  ["2023 — 2025", "Diploma of College Studies (DEC) in Natural Sciences", "Collège Bois-de-Boulogne"],
]

export const certifications = [
  { title: "Battery Systems Safety", issuer: "Institut du véhicule innovant (IVI)", year: "2026", document: null },
  { title: "Quantum Programming — Grover's Algorithm", issuer: "Institut quantique, Université de Sherbrooke", year: "2025", document: "/certificate-previews/grover.png" },
  { title: "Cloud Computing Security", issuer: "Canadian Mobility and Aerospace Institute (CMAI/IMACA)", year: "2025", document: "/certificate-previews/cloud-computing-security.png" },
  { title: "WHMIS 2015", issuer: "Polytechnique Montréal / LeCampus", year: "2025", document: "/certificate-previews/whmis-2015.png" },
  { title: "Respiratory Protection", issuer: "Polytechnique Montréal", year: "2025", document: "/certificate-previews/respiratory-protection.png" },
]

export const technologyColors: Record<string, string> = {
  "C++": "coral", "C/C++": "coral", "Python": "teal", "Rust": "lavender", "MATLAB": "amber",
  "ESP32": "sage", "ESP32-S3": "sage", "ESP32 / ESP32-S3": "sage", "FreeRTOS": "sage", "Arduino": "sage", "STM32": "sage", "PCB design": "sage", "Wiring": "terracotta", "Validation": "sage",
  "Raspberry Pi": "sage", "Digital logic": "blue", "BCD": "lavender", "Prototyping": "terracotta", "RTC": "teal", "LCD": "teal", "Servo": "rose", "Keypad": "amber",
  "Edge Impulse": "lavender", "Computer vision": "lavender", "Image processing": "lavender", "Algorithms": "lavender", "Data compilation": "blue",
  "Wi-Fi / BLE": "teal", "Wi-Fi": "teal", "BLE": "teal", "UART": "blue", "CAN": "rose", "NFC": "teal", "LoRa": "rose", "Communications": "teal",
  "Git": "blue", "GitHub": "blue", "KiCad": "blue", "LTspice": "lavender", "React": "teal", "AWS": "blue", "Partnerships": "rose", "Events": "terracotta",
  "Analog electronics": "amber", "Signal processing": "amber", "Filtering": "amber", "LC resonance": "amber", "Power systems": "terracotta", "RF": "rose", "Instrumentation": "amber",
  "MATLAB/Simulink": "amber", "AutoCAD Electrical": "terracotta", "RapidHarness": "rose", "Git/GitHub": "blue",
  "SPI": "blue", "I²C": "teal", "NFC/RFID": "rose", "LoRa/Sub-GHz": "rose", "PWM": "sage", "ADC": "amber",
  "Circuit and PCB design": "sage", "instrumentation": "amber", "analog filtering": "amber", "wiring": "terracotta", "embedded integration and validation": "sage",
  "Embedded systems": "sage", "power electronics": "terracotta", "control": "teal", "signal processing": "amber", "embedded AI": "lavender",
  "Yahoo Finance": "teal", "Bedrock": "lavender",
}

export function technologyColor(label: string) {
  return technologyColors[label] ?? "neutral"
}
