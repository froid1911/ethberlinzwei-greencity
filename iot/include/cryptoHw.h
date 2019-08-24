#ifndef CRYPTOHW_H
#define CRYPTOHW_H

extern void cryptoHw_setup();
extern void cryptoHw_loop ();

extern void printPublicKey();
extern bool cryptoHw_signString(char *data, uint8_t signBuffer[64]);
extern bool cryptoHw_getRnd(const uint8_t ** data, uint8_t * size);
extern bool cryptoHw_hashString(uint8_t outData[32], char * inData);

#endif