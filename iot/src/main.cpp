#include <Arduino.h>

void setup() {
  delay( 1000u );
  Serial.begin(9600UL);
  while(!Serial);
  Serial.println();

  pinMode(0, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(4, OUTPUT);

  Serial.println("starting iot...");
}

int LEDstate = 1;

void loop() {
  digitalWrite(0,   LEDstate );
  digitalWrite(2,   LEDstate );
  digitalWrite(4,   LEDstate );

  if ( LEDstate ) LEDstate = 0; else LEDstate = 1;

  delay(1000u);
}