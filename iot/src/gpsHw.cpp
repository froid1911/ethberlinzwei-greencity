#include <NMEAGPS.h>
#include <Streamers.h>

HardwareSerial hardwareSerial(2);

#include <HardwareSerial.h>
#define gpsPort hardwareSerial
#define GPS_PORT_NAME "HardwareSerial2"

#include "gpsHw.h"

/* config */
#define GPS_BAUDRATE        9600L
#define GPS_UART_MODULE     2
#define GPS_UART_CONFIG     SERIAL_8N1
#define GPS_RX_PIN          25
#define GPS_TX_PIN          26
#define GPS_TIMEOUT         5000
#define GPS_UPDATE_RATE     10000

/* Check configuration */
#ifndef NMEAGPS_RECOGNIZE_ALL
  #error You must define NMEAGPS_RECOGNIZE_ALL in NMEAGPS_cfg.h!
#endif

#ifdef NMEAGPS_INTERRUPT_PROCESSING
  #error You must *NOT* define NMEAGPS_INTERRUPT_PROCESSING in NMEAGPS_cfg.h!
#endif

static NMEAGPS gps;
static gps_fix last_fix;
static gps_fix current_fix;
static int module_state;
static int tracking_state;
static unsigned long gpsHandlerTimestamp;
static unsigned long gpsCommunicationTimestamp;
static unsigned long trackTimestamp;
static bool firstFix;

// module state
#define GPS_STATE_NO_COMMUNICATION 0
#define GPS_STATE_NO_FIX           1
#define GPS_STATE_FIX              2

// tracking state
#define TRACKING_STATE_STANDSTILL 0
#define TRACKING_STATE_MOVE       1

static float degreesToRadians(float degrees);
static void check(void);
static void track(void);

void gpsHw_setup() {
  module_state = GPS_STATE_NO_COMMUNICATION;
  tracking_state = TRACKING_STATE_STANDSTILL;

  firstFix = false;

  gpsHandlerTimestamp = millis();
  gpsCommunicationTimestamp = millis();
  trackTimestamp = millis();

  gpsPort.begin(GPS_BAUDRATE, GPS_UART_CONFIG, GPS_RX_PIN, GPS_TX_PIN);
  while(!gpsPort);
}

void gpsHw_loop() {
  check();

    // stay here, but update the timestamp for timeout handling
  if ( ( millis() - trackTimestamp ) > 2000 ) {
    track();
    trackTimestamp = millis();
  }
  gpsHandlerTimestamp = millis();
}

static void check() {

  boolean dataAvailable = false;
  boolean communicationAvailable = false;

  if (gpsPort.available() > 0) {
    // low level communication working
    gpsCommunicationTimestamp = millis();
    communicationAvailable    = true;
  }

  
  // gps.available returns true if fix is available
  // there might be more than one fix available, just use the last one
  while( gps.available(gpsPort) ) {
    current_fix = gps.read();
    dataAvailable = true;
  }

  // module statemachine
  switch (module_state) {
    case GPS_STATE_NO_COMMUNICATION:
      if (dataAvailable                           &&
          current_fix.valid.location                 &&
          current_fix.valid.status                   &&
          current_fix.status != gps_fix::STATUS_NONE &&
          current_fix.status != gps_fix::STATUS_EST  &&
          current_fix.status != gps_fix::STATUS_TIME_ONLY) {
        module_state = GPS_STATE_FIX;
        Serial.println("GPS state changed to 'fixed'");
        if(firstFix == false) {
          last_fix = current_fix;
          firstFix = true;
        }
        gpsHandlerTimestamp = millis();
      } else if ( communicationAvailable ) {
        module_state = GPS_STATE_NO_FIX;
        Serial.println("GPS state changed to 'no fix'");
      }
      break;

    case GPS_STATE_NO_FIX:
      if ((millis() - gpsCommunicationTimestamp ) > 5000) {
        module_state = GPS_STATE_NO_COMMUNICATION;
      } else if ( dataAvailable  &&
                  current_fix.valid.location &&
                  current_fix.valid.status &&
                  current_fix.status != gps_fix::STATUS_NONE &&
                  current_fix.status != gps_fix::STATUS_EST &&
                  current_fix.status != gps_fix::STATUS_TIME_ONLY ) {
        module_state = GPS_STATE_FIX;
        gpsHandlerTimestamp = millis();
        Serial.println("GPS state changed to 'fixed'");
        if(firstFix == false) {
          last_fix = current_fix;
          firstFix = true;
        }
      } else {
        // stay here, but update the timestamp for timeout handling
        gpsHandlerTimestamp = millis();
      }
      break;

    case GPS_STATE_FIX:
      if ( ( millis() - gpsCommunicationTimestamp ) > 5000 ) {
        module_state = GPS_STATE_NO_COMMUNICATION;
      } else if ( ( !dataAvailable  ||
                  ( !current_fix.valid.location &&
                    !current_fix.valid.status &&
                    current_fix.status != gps_fix::STATUS_STD &&
                    current_fix.status != gps_fix::STATUS_DGPS ) ) &&
                  ( ( millis() - gpsHandlerTimestamp ) > 5000 ) ) {
        module_state = GPS_STATE_NO_FIX;
        Serial.println("GPS state changed to 'no fix'");
      } else {
        if( dataAvailable ) {
          //update data, frequency 1Hz
          
        }
      }
      break;

    default:
      Serial.println("gps handler: unknown handler state");
      break;
  }

  if (gps.overrun()) {
    gps.overrun(false);
    Serial.println("DATA OVERRUN: took too long to print GPS data!");
  }
}

static float degreesToRadians(float degrees) {
  return degrees * PI / 180.f;
}

static void track(void) {

  float distance = distanceInKmBetweenEarthCoordinates(
    last_fix.latitude(),
    last_fix.longitude(),
    current_fix.latitude(),
    current_fix.longitude()
  );

  /* transition */
  switch (tracking_state)
  {
    case TRACKING_STATE_STANDSTILL:
      if(distance > 0.01)
      {
        tracking_state = TRACKING_STATE_MOVE;
      }
      break;
    
   case TRACKING_STATE_MOVE:
      if(distance <= 0.01)
      {
        tracking_state = TRACKING_STATE_STANDSTILL;
      }
      break;

    default:
      break;
  }

  /* do action */
    switch (tracking_state)
  {
    case TRACKING_STATE_STANDSTILL:
      Serial.println(
          "stand still at " +
          String(current_fix.latitude(), 8) + " lat, " +
          String(current_fix.longitude(), 8) + " long, " +
          String(distance * 1000.f ) + " m"
        );
      break;
    
   case TRACKING_STATE_MOVE:
        Serial.println(
        "move at " +
        String(current_fix.latitude(), 8) + " lat, " +
        String(current_fix.longitude(), 8) + " long, " +
        String(distance * 1000.f ) + " m"
      );

      last_fix = current_fix;
      break;

    default:
      break;
  }
}

float distanceInKmBetweenEarthCoordinates(float lat1, float lon1, float lat2, float lon2) {
  const float earthRadiusKm = 6371.f;

  float dLat = degreesToRadians(lat2-lat1);
  float dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  float a = sin(dLat/2) * sin(dLat/2) +
          sin(dLon/2) * sin(dLon/2) * cos(lat1) * cos(lat2); 
  float c = 2 * atan2(sqrt(a), sqrt(1-a)); 
  return earthRadiusKm * c;
}