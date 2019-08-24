#include <Arduino.h>

#include "cryptoHw.h"

static void dumpHex(uint8_t * stream, uint8_t length);

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
}

int LEDstate = 1;

void loop() {
  uint8_t *data;
  uint8_t  size;

  if ( cryptoHw_getRnd((const uint8_t **)&data, &size) )
  {
    dumpHex(data, size);
  }

  digitalWrite(0,   LEDstate );
  digitalWrite(2,   LEDstate );
  digitalWrite(4,   LEDstate );

  if ( LEDstate ) LEDstate = 0; else LEDstate = 1;

  delay(1000u);
}

static void dumpHex(uint8_t * stream, uint8_t length)
{
  char temp[3] = {};
  for (int x = 0; x < length; x++){
    sprintf(temp, "%02x", stream[x]);
    Serial.write(temp);
  }

  Serial.write("\n");
}