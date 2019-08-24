#include <Arduino.h>
#include <Wire.h>

#include <cryptoauth.h>

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
