"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Code2 } from "lucide-react"

export default function CodeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/20 px-6 py-3 text-sm font-medium text-white hover:bg-primary/30 hover:border-primary/70 transition duration-200">
          <Code2 className="w-4 h-4" />
          View Complete Arduino Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-[96vw] overflow-hidden p-0">
        <DialogHeader className="flex items-center justify-between gap-4 border-b border-primary/20 px-6 py-4 bg-gradient-to-r from-primary/6 to-transparent">
          <div>
            <DialogTitle>ELE1001 Arduino Code</DialogTitle>
            <p className="mt-1 text-xs text-muted-foreground">Full Arduino sketch for the ELE1001 project</p>
          </div>
        </DialogHeader>
        <div className="h-[78vh] overflow-hidden bg-[var(--section-surface)]">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
            <aside className="col-span-1 rounded-lg border border-primary/10 bg-primary/5 p-4">
              <h4 className="text-sm font-semibold text-primary">File Info</h4>
              <ul className="mt-3 text-sm text-muted-foreground space-y-2">
                <li>Language: Arduino C++</li>
                <li>Contains: keypad logic, BCD counters, display</li>
              </ul>
            </aside>

            <div className="col-span-1 lg:col-span-3 overflow-auto rounded-lg bg-slate-950 p-4">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
