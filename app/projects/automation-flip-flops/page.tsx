import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ChevronRight, Code2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageZoomable } from "./image-modal"

export const metadata: Metadata = {
  title: "ELE1001 BCD Keypad Display & Pill Bottling System",
  description: "Complete embedded system for automated pill bottling with Arduino keypad input, BCD display, and discrete logic counting stages.",
}

function CodeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/20 px-6 py-3 text-sm font-medium text-white hover:bg-primary/30 hover:border-primary/70 transition duration-200">
          <Code2 className="w-4 h-4" />
          View Complete Arduino Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>ELE1001 Arduino Code</DialogTitle>
        </DialogHeader>
        <div className="bg-slate-950 rounded-lg p-4 overflow-auto flex-1">
          <pre className="text-xs text-slate-100 font-mono">
            {`bool isBlank = false;
const int U0_T = A0;
const int U1_T = A1;
const int U2_T = A2;
const int U3_T = A3;

const int U0_U = 8;
const int U1_U = 9;
const int U2_U = 10;
const int U3_U = 11;

const int PIN_STAR_SIGNAL = 12;
const int PIN_DIESE_SIGNAL = 13;
const int PIN_Z_SIGNAL = A5;

void blankDisplays() {
  digitalWrite(U0_T, HIGH);
  digitalWrite(U1_T, HIGH);
  digitalWrite(U2_T, HIGH);
  digitalWrite(U3_T, HIGH);
  digitalWrite(U0_U, HIGH);
  digitalWrite(U1_U, HIGH);
  digitalWrite(U2_U, HIGH);
  digitalWrite(U3_U, HIGH);
}

void enableOutputs() {
  pinMode(U0_T, OUTPUT); pinMode(U1_T, OUTPUT);
  pinMode(U2_T, OUTPUT); pinMode(U3_T, OUTPUT);
  pinMode(U0_U, OUTPUT); pinMode(U1_U, OUTPUT);
  pinMode(U2_U, OUTPUT); pinMode(U3_U, OUTPUT);
  pinMode(PIN_Z_SIGNAL, OUTPUT);
}

void disableOutputs() {
  pinMode(U0_T, INPUT);
  pinMode(U1_T, INPUT);
  pinMode(U2_T, INPUT);
  pinMode(U3_T, INPUT);
  pinMode(U0_U, INPUT);
  pinMode(U1_U, INPUT);
  pinMode(U2_U, INPUT);
  pinMode(U3_U, INPUT);
}

const byte ROWS = 4, COLS = 4;

char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

byte rowPins[ROWS] = {7, 6, 5, 4};
byte colPins[COLS] = {3, 2, 1, 0};

inline void writeTens(uint8_t v) {
  digitalWrite(U0_T, (v >> 0) & 1);
  digitalWrite(U1_T, (v >> 1) & 1);
  digitalWrite(U2_T, (v >> 2) & 1);
  digitalWrite(U3_T, (v >> 3) & 1);
}

inline void writeUnits(uint8_t v) {
  digitalWrite(U0_U, (v >> 0) & 1);
  digitalWrite(U1_U, (v >> 1) & 1);
  digitalWrite(U2_U, (v >> 2) & 1);
  digitalWrite(U3_U, (v >> 3) & 1);
}

inline int8_t keyToBCD(char k) {
  switch (k) {
    case '0': return 0; case '1': return 1; case '2': return 2; case '3': return 3;
    case '4': return 4; case '5': return 5; case '6': return 6; case '7': return 7;
    case '8': return 8; case '9': return 9; default: return -1;
  }
}

char getKeyRelease() {
  static bool pressed = false;
  static char lastChar = 0;
  for (byte c = 0; c < COLS; c++) {
    digitalWrite(colPins[c], LOW);
    for (byte r = 0; r < ROWS; r++) {
      if (digitalRead(rowPins[r]) == LOW) {
        if (!pressed) {
          pressed = true;
          lastChar = keys[r][c];
        }
        digitalWrite(colPins[c], HIGH);
        return 0;
      }
    }
    digitalWrite(colPins[c], HIGH);
  }
  if (pressed) {
    pressed = false;
    return lastChar;
  }
  return 0;
}

void setup() {
  for (byte r = 0; r < ROWS; r++) pinMode(rowPins[r], INPUT_PULLUP);
  for (byte c = 0; c < COLS; c++) { pinMode(colPins[c], OUTPUT); digitalWrite(colPins[c], HIGH); }
  pinMode(U0_T, OUTPUT); pinMode(U1_T, OUTPUT);
  pinMode(U2_T, OUTPUT); pinMode(U3_T, OUTPUT);
  pinMode(U0_U, OUTPUT); pinMode(U1_U, OUTPUT);
  pinMode(U2_U, OUTPUT); pinMode(U3_U, OUTPUT);
  pinMode(PIN_STAR_SIGNAL, OUTPUT);
  pinMode(PIN_DIESE_SIGNAL, OUTPUT);
  digitalWrite(PIN_STAR_SIGNAL, LOW);
  digitalWrite(PIN_DIESE_SIGNAL, LOW);
  pinMode(PIN_Z_SIGNAL, OUTPUT);
  digitalWrite(PIN_Z_SIGNAL, LOW);
  writeTens(0);
  writeUnits(0);
}

void loop() {
  static uint8_t valTens = 0;
  static uint8_t valUnits = 0;
  static bool focusUnits = true;
  char k = getKeyRelease();
  
  if (isBlank) {
    if (k == 0) {
      blankDisplays();
      return;
    } else {
      isBlank = false;
      enableOutputs();
    }
  }
  
  if (k) {
    int8_t bcd = keyToBCD(k);
    if (bcd >= 0) {
      digitalWrite(PIN_Z_SIGNAL, HIGH);
      delay(300);
      digitalWrite(PIN_Z_SIGNAL, LOW);
      enableOutputs();
      if (focusUnits) {
        valUnits = (uint8_t)bcd;
        writeUnits(valUnits);
        focusUnits = false;
      } else {
        valTens = (uint8_t)bcd;
        writeTens(valTens);
        focusUnits = true;
      }
    } else if (k == '*') {
      blankDisplays();
      digitalWrite(PIN_Z_SIGNAL, LOW);
      isBlank = true;
    } else if (k == '#') {
      digitalWrite(PIN_DIESE_SIGNAL, HIGH);
      delay(300);
      digitalWrite(PIN_DIESE_SIGNAL, LOW);
      enableOutputs();
      writeTens(valTens); 
      writeUnits(valTens);
    }
  }
  writeTens(valTens);
  writeUnits(valUnits);
}`}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ELE1001Project() {
  return (
    <main className="min-h-screen bg-[var(--section-alt)] text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-10 shadow-[0_25px_65px_-45px_rgba(94,177,255,0.85)] backdrop-blur-xl">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.35em] text-primary/70">ELE1001 — Digital Systems & Embedded</p>
              <h1 className="mt-4 text-5xl font-bold text-[var(--electric-blue)] lg:text-6xl">
                BCD Keypad Display & Pill Bottling System
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-3xl">
                A complete three-stage automated system combining Arduino-based user input with discrete digital logic for accurate pill counting and bottling control. Demonstrates microcontroller integration with TTL components in a real-world industrial application.
              </p>
            </div>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/20 whitespace-nowrap"
            >
              ← Back to projects
            </Link>
          </div>
        </div>

        {/* Objective */}
        <section className="mb-16 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-10">
          <h2 className="text-3xl font-bold text-[var(--electric-blue)]">General Objective</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            The objective of this project is to design an embedded digital system capable of reading a user-defined quantity through a 4×4 keypad, displaying that value in BCD on two seven-segment displays, and using this value to control an automated pill bottling process. The system must be reliable, deterministic, and compatible with downstream digital logic, combining discrete logic components with Arduino-based optimization for a modular and maintainable architecture.
          </p>
        </section>

        {/* System Overview */}
        <section className="mb-16 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-10">
          <h2 className="text-3xl font-bold text-[var(--electric-blue)] mb-8">System Architecture: Three Stages</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white font-bold">1</div>
                <h3 className="text-xl font-semibold text-[var(--electric-blue)]">User Input & Display</h3>
              </div>
              <p className="text-muted-foreground">Arduino manages keypad scanning, BCD conversion, and seven-segment display control entirely in software.</p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white font-bold">2</div>
                <h3 className="text-xl font-semibold text-[var(--electric-blue)]">Pill Counting</h3>
              </div>
              <p className="text-muted-foreground">Cascaded BCD counters and magnitude comparator detect when the correct number of pills has been counted.</p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white font-bold">3</div>
                <h3 className="text-xl font-semibold text-[var(--electric-blue)]">Bottle Counting</h3>
              </div>
              <p className="text-muted-foreground">Modulo-8 counter tracks filled bottles (0–7) with seven-segment display and automatic wraparound detection.</p>
            </div>
          </div>
        </section>

        {/* Stage 1 */}
        <section className="mb-16 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white text-lg font-bold">1</div>
            <h2 className="text-3xl font-bold text-[var(--electric-blue)]">Stage 1: User Input & Display (Arduino)</h2>
          </div>

          <div className="space-y-8">
            {/* Keypad Reading */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Keypad Reading
              </h3>
              <p className="text-muted-foreground mb-4">
                A 4×4 matrix keypad serves as the human-machine interface. The Arduino performs matrix scanning:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Columns are driven LOW one at a time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Rows are read using INPUT_PULLUP configuration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>A key is detected when a row reads LOW while its column is active</span>
                </li>
              </ul>
              <div className="mt-4 p-4 border-l-4 border-primary/40 bg-transparent rounded">
                <p className="text-sm text-muted-foreground font-semibold">Key Design Decision:</p>
                <p className="text-sm text-muted-foreground mt-2">
                  The system detects <strong>key release</strong>, not key press. This naturally eliminates switch bounce and prevents repeated inputs when a key is held—a crucial reliability improvement.
                </p>
              </div>
            </div>

            {/* BCD Conversion */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Conversion to BCD
              </h3>
              <p className="text-muted-foreground mb-4">
                When a numeric key (0–9) is released:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>The key is converted to its BCD representation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>The system automatically alternates between units and tens digits</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>An internal state variable handles this alternation</span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This design allows intuitive two-digit entry without additional confirmation steps.
              </p>
            </div>

            {/* BCD Output */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                BCD Output Generation
              </h3>
              <p className="text-muted-foreground mb-4">
                The Arduino drives eight dedicated GPIO pins:
              </p>
              <div className="grid md:grid-cols-2 gap-4 ml-6 text-muted-foreground">
                <div className="p-3 border border-primary/20 rounded bg-transparent">
                  <p className="font-semibold text-primary mb-2">Units Digit</p>
                  <p className="text-sm">4 pins for BCD representation (2⁰, 2¹, 2², 2³)</p>
                </div>
                <div className="p-3 border border-primary/20 rounded bg-transparent">
                  <p className="font-semibold text-primary mb-2">Tens Digit</p>
                  <p className="text-sm">4 pins for BCD representation (2⁰, 2¹, 2², 2³)</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-4">
                Each pin corresponds directly to one BCD bit, ensuring full compatibility with standard TTL components such as decoders and comparators.
              </p>
            </div>

            {/* Display Blanking */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Display Blanking with <code className="text-primary font-semibold">*</code>
              </h3>
              <p className="text-muted-foreground mb-4">
                Pressing the <code className="text-primary font-semibold">*</code> key blanks both displays by disabling all output pins.
              </p>
              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>All BCD lines are forced to a state that turns off the seven-segment displays</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>No display updates occur while blanked</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Any valid numeric key automatically re-enables outputs</span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This feature improves usability by allowing visual reset without affecting internal logic.
              </p>
            </div>

            {/* Control Signals */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Validation & Synchronization Signals
              </h3>
              <div className="space-y-4">
                <div className="p-4 border border-primary/20 rounded bg-transparent">
                  <p className="font-semibold text-primary mb-2">Z Signal</p>
                  <p className="text-sm text-muted-foreground">
                    Each valid numeric entry generates a short pulse on the Z signal. This validates the digit entry to external counting logic, replacing what would otherwise require extra flip-flops and clock conditioning.
                  </p>
                </div>
                <div className="p-4 border border-primary/20 rounded bg-transparent">
                  <p className="font-semibold text-primary mb-2"># Signal (Finalize)</p>
                  <p className="text-sm text-muted-foreground">
                    Pressing <code className="text-primary font-semibold">#</code> generates a dedicated control pulse that tells the counting system to begin a new cycle. It also copies the tens digit to both displays for a stable final value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stage 2 */}
        <section className="mb-16 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white text-lg font-bold">2</div>
            <h2 className="text-3xl font-bold text-[var(--electric-blue)]">Stage 2: Pill Counting Per Bottle (Discrete Logic)</h2>
          </div>

          <div className="space-y-8">
            {/* BCD Counters */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                BCD Counters for Pills (74LS192)
              </h3>
              <p className="text-muted-foreground mb-4">
                Two cascaded 74LS192 BCD counters track pill count:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>Units counter:</strong> Counts individual pills (0–9)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span><strong>Tens counter:</strong> Increments when units rolls over from 9 to 0</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Together they produce clean BCD counts from 00 to 99 without additional logic</span>
                </li>
              </ul>
            </div>

            {/* Comparison */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Comparison with Target (SN74LS682)
              </h3>
              <p className="text-muted-foreground mb-4">
                An 8-bit magnitude comparator (SN74LS682) compares:
              </p>
              <div className="grid md:grid-cols-2 gap-4 ml-6 text-muted-foreground">
                <div className="p-3 border border-primary/20 rounded bg-transparent">
                  <p className="font-semibold text-primary mb-2">Input A</p>
                  <p className="text-sm">BCD value entered by the user</p>
                </div>
                <div className="p-3 border border-primary/20 rounded bg-transparent">
                  <p className="font-semibold text-primary mb-2">Input B</p>
                  <p className="text-sm">BCD value from the pill counters</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-4">
                When the values match, the comparator output changes state (active LOW). An inverter converts this to positive logic compatible with downstream modules.
              </p>
            </div>

            {/* End of Cycle */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                End of Cycle Detection
              </h3>
              <p className="text-muted-foreground mb-4">
                When the comparator signals equality:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Both pill counters reset to zero</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>The system prepares for the next bottle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>The equality signal is forwarded to the bottle counter</span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This ensures each bottle is counted exactly once with deterministic timing.
              </p>
            </div>
          </div>
        </section>

        {/* Stage 3 */}
        <section className="mb-16 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white text-lg font-bold">3</div>
            <h2 className="text-3xl font-bold text-[var(--electric-blue)]">Stage 3: Counting Filled Bottles (Discrete Logic)</h2>
          </div>

          <div className="space-y-8">
            {/* Bottle Counter */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Modulo-8 Bottle Counter (74LS93)
              </h3>
              <p className="text-muted-foreground mb-4">
                A 74LS93 configured as a modulo-8 counter tracks filled bottles:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Uses only three bits (counting 0–7)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Each completed bottle increments the counter</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Naturally wraps around after 7 (no extra detection logic needed)</span>
                </li>
              </ul>
            </div>

            {/* Display */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Display of Bottle Count (74LS247)
              </h3>
              <p className="text-muted-foreground">
                The three-bit counter output drives a 74LS247 BCD-to-seven-segment decoder, which controls a dedicated seven-segment display showing the number of filled bottles (0–7). This provides real-time visual feedback on production progress.
              </p>
            </div>

            {/* Global Reset */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Global Reset Using <code className="text-primary font-semibold">#</code>
              </h3>
              <p className="text-muted-foreground mb-4">
                Pressing the <code className="text-primary font-semibold">#</code> key resets:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Both pill counters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>The bottle counter</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>The display system</span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This guarantees a clean return to a known and stable initial state for the next production cycle.
              </p>
            </div>
          </div>
        </section>

        {/* Why Arduino */}
        <section className="mb-16 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-10">
          <h2 className="text-3xl font-bold text-[var(--electric-blue)] mb-6">Why Arduino Was Chosen</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Migrating the display and keypad logic to an Arduino provided significant engineering advantages over a purely discrete implementation:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">Reduced Hardware Complexity</p>
                <p className="text-sm text-muted-foreground">Eliminates dozens of debounce capacitors and logic gates</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">Elimination of Debounce Circuits</p>
                <p className="text-sm text-muted-foreground">Release-detection algorithm handles bounce inherently</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">Improved Signal Stability</p>
                <p className="text-sm text-muted-foreground">Software control ensures clean, predictable BCD outputs</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">Easier Future Modifications</p>
                <p className="text-sm text-muted-foreground">Firmware changes require no PCB redesign</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">Better Synchronization</p>
                <p className="text-sm text-muted-foreground">Precise timing control for Z and # signal pulses</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">TTL Compatibility</p>
                <p className="text-sm text-muted-foreground">Direct BCD outputs work seamlessly with discrete logic</p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-16 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-10">
          <h2 className="text-3xl font-bold text-[var(--electric-blue)] mb-8">Project Resources & Media</h2>
          
          <div className="space-y-6 mb-8">
            <ImageZoomable />

            <figure className="overflow-hidden rounded-2xl border border-primary/20">
              <div className="w-full h-[65vh] bg-black rounded overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/AgQNyCCDQiU"
                  title="ELE1001 Project Presentation"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <figcaption className="p-4 text-sm text-muted-foreground text-center">
                Project Presentation Video (YouTube)
              </figcaption>
            </figure>
          </div>

          <div className="space-y-3 flex flex-col">
            <CodeModal />

            <a
              href="https://github.com/AbderrahmaneErraqabi/ELE1001-Keypad-7Segment-System"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 GitHub Repository
            </a>
          </div>
        </section>

        {/* Summary */}
        <section className="rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-10">
          <h2 className="text-3xl font-bold text-[var(--electric-blue)] mb-6">Final Result</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The complete system delivers a robust, production-ready solution for automated pill bottling:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Intuitive user input via matrix keypad</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Stable, synchronized BCD output signals</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Accurate pill counting from 0 to 99</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Automatic bottle completion detection</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Modular bottle tracking (0–7 bottles per box)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Clean, predictable state resets</span>
            </li>
          </ul>
          <p className="text-muted-foreground mt-8 italic">
            The design respects digital logic principles, modularity, and real-world reliability constraints, demonstrating professional engineering practice in embedded systems.
          </p>
        </section>
      </div>
    </main>
  )
}
