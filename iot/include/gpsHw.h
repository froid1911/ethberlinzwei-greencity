#ifndef GPSHW_H
#define GPSHW_H

void gpsHw_setup();
void gpsHw_loop();

float distanceInKmBetweenEarthCoordinates(float lat1, float lon1, float lat2, float lon2);

#endif