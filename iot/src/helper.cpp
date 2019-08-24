#include "helper.h"

void dumpHex(uint8_t * stream, uint8_t length)
{
  char temp[3] = {};
  for (int x = 0; x < length; x++){
    sprintf(temp, "%02x", stream[x]);
    Serial.write(temp);
  }

  Serial.write("\n");
}
