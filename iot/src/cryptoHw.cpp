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

void printPublicKey() {

}

bool cryptoHw_signString(char *data, uint8_t signBuffer[64]) {
  uint8_t ret;
  uint8_t *bufPtr;
  int bufLen;
  bool success = false;

  ret = ecc.calculateSHA256((uint8_t*) data, strlen((const char *)data));
  if ( ret == 0 ) {
    bufPtr = (uint8_t*) ecc.rsp.getPointer();
    bufLen = ecc.rsp.getLength();
    if(bufLen >= 32u) {
      ret = ecc.sign( 0u, bufPtr, bufLen);
      if ( ret == 0 ) {
        bufPtr = (uint8_t*)ecc.rsp.getPointer();
        bufLen = ecc.rsp.getLength();
        memcpy(signBuffer, bufPtr, 64);
        success = true;
      } else {
        Serial.print(F("signing string data failed: "));
        Serial.println(ret, HEX);
      }
    } else {
      Serial.print(F("hashing string data failed, hash response to short"));
    }
  } else {
    Serial.print(F("hashing string data failed: "));
    Serial.println(ret, HEX);
  }

  return success;
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

bool cryptoHw_hashString(uint8_t outData[32], char * inData) {
  uint8_t ret;
  bool success = false;

  Serial.println("hashing data: " + String(inData));

  /* hash 1 */
  ret = ecc.calculateSHA256((uint8_t*) inData, strlen((const char *)inData));
  if ( ret == 0 ) {
    Serial.print( "hash result: " );
    uint8_t *bufPtr = (uint8_t *)ecc.rsp.getPointer();
    int bufLen = ecc.rsp.getLength();
    dumpHex(bufPtr, bufLen);
    success = true;
  } else {
    Serial.print(F("hashing failed: "));
    Serial.println(ret, HEX);
  }

  return success;
}

void cryptoHw_loop() {

}
