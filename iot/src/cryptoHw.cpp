#include <Arduino.h>
#include <Wire.h>

#include <cryptoauth.h>

#include "helper.h"

// Object for ATECC508A
AtEccX08 ecc = AtEccX08();

void cryptoHw_setup() {
  Wire.begin();
  Wire.setClock(90000);

  eccX08p_wakeup();
  Wire.beginTransmission(0x60);
  byte error = Wire.endTransmission();

  /*
   * 0:success
   * 1:data too long to fit in transmit buffer
   * 2:received NACK on transmit of address
   * 3:received NACK on transmit of data
   * 4:other error 
   */
  if( error == 0 ) {
    Serial.println( "I2C device found at address 0x" + String( 0x60, HEX ) );
  } else {
    Serial.println( "ATECC508A not found. I2C communication error" );

  }
}

static void cryptoHw_signString(uint8_t *data, int size) {
  uint8_t ret;
  uint8_t *bufPtr;
  int bufLen;
  uint8_t hash[32];

  Serial.println(F("Signing string data"));
  ret = ecc.calculateSHA256( data, size );
  if ( ret == 0 ) {
    Serial.print("hash: ");
    bufPtr = (uint8_t*) ecc.rsp.getPointer();
    bufLen = ecc.rsp.getLength();
    dumpHex(bufPtr, bufLen);
    if(bufLen >= 32u) {
      ret = ecc.sign( 0u, bufPtr, bufLen);
      if ( ret == 0 ) {
        Serial.print( "signature: " );
        bufPtr = (uint8_t*)ecc.rsp.getPointer();
        bufLen = ecc.rsp.getLength();
        dumpHex(bufPtr, bufLen);
      } else {
        Serial.print(F("signing string data failed: "));
        Serial.println(ret, HEX);
      }
    } else {
      Serial.print(F("hashing string data failed, hash response to short"));
      return;
    }
  } else {
    Serial.print(F("hashing string data failed: "));
    Serial.println(ret, HEX);
    return;
  }
}

bool cryptoHw_getRnd(const uint8_t ** data, uint8_t * size) {
  bool success = false;

  if (0 == ecc.getRandom()) {
    *size = ecc.rsp.getLength();
    *data = ecc.rsp.getPointer();
    success = true;
  }
  else {
    Serial.println(F("Random Number Failure"));
  }
  return success;
}

void cryptoHw_loop() {

}
