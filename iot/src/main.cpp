#include <Arduino.h>

#include "helper.h"
#include "cryptoHw.h"
#include "cryptoHw.h"
#include "gpsHw.h"


static int LEDstate = 1;
static unsigned long mainTimestamp;

void setup() {

  delay( 1000u );
  Serial.begin(9600UL);
  while(!Serial);
  Serial.println();

  Serial.println("starting iot");

  pinMode(0, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(4, OUTPUT);

  cryptoHw_setup();
  gpsHw_setup();

  mainTimestamp = millis();
}

void loop() {
  cryptoHw_loop();
  gpsHw_loop();

  digitalWrite(0,   LEDstate );
  digitalWrite(2,   LEDstate );
  digitalWrite(4,   LEDstate );

  if ( LEDstate ) LEDstate = 0; else LEDstate = 1;

  delay(100u);
}
