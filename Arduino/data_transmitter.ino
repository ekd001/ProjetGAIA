//Include necessary libraries
#include <SPI.h>      // Required for SPI communication
#include <LoRa.h>     // LoRa library for Arduino
#include "DHT.h"      //DHT library for arduino

//Define LoRa module pins
#define SS_PIN 10     // Slave Select pin
#define RST_PIN 9    // Reset pin 
#define DIO0_PIN 7    // DIO0 pin (used for receive callback)
#define DHTPIN 2     // Digital pin connected to the DHT sensor
#define PINMODE 10

// Define LoRa frequency (868.1 MHz for Europe) and the type of captor
#define LORA_FREQUENCY 868.1E6  // Frequency in Hz
#define DHTTYPE DHT22   // DHT 22 

//Initialize DHT sensor
DHT dht(DHTPIN, DHTTYPE);

//Data for the transmission
  float temperature = 0.0;
  float humidity = 0.0;



void setup() {
  pinMode(PINMODE, OUTPUT);
 initializeCommunication();
 initializeCaptor(dht);
 Serial.println("Sending of data");
}

void loop() {
  sendData();
}

//----------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
void initializeCommunication(){
  // put your setup code here, to run once:
  // Initialize serial communication
  digitalWrite(PINMODE, HIGH);
  Serial.begin(9600);
  while (!Serial);  // Wait for serial port to connect. Needed for native USB port only

  Serial.println("LoRa Bidirectional Communication (868.1 MHz)");

  // Configure LoRa transceiver module
  LoRa.setPins(SS_PIN, RST_PIN, DIO0_PIN);

  // Initialize LoRa
  if (!LoRa.begin(LORA_FREQUENCY)) {
    Serial.println("LoRa initialization failed. Check your connections.");
    while (1);  // If failed, do nothing
  }

  // Set LoRa parameters
  LoRa.setSpreadingFactor(12);  // Set spreading factor (6-12). Higher SF increases range but decreases data rate
  LoRa.setSyncWord(0xF3);       // Set sync word to ensure communication only between nodes with the same sync word

  Serial.println("LoRa initialization successful.");
}

void initializeCaptor(DHT dht){
  dht.begin();
}

float readHumidity(DHT dht){
  delay(2500);
  //Reading humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();


  // Check if any reads failed and exit early (to try again).
  if (isnan(h)) {
    Serial.println(F("Failed to read humidity from DHT sensor!"));
    return;
  }
  return h;
}

float readTemperature(DHT dht){
  delay(2500);
  //Reading temperature takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float t = dht.readTemperature();


  // Check if any reads failed and exit early (to try again).
  if (isnan(t)) {
    Serial.println(F("Failed to read temperature from DHT sensor!"));
    return;
  }
  return t;
}

void sendData(){
  
  humidity = readHumidity(dht);
  temperature = readTemperature(dht);

  LoRa.beginPacket();
  LoRa.print(humidity);           // Send humidity
  LoRa.print(",");                // Separator between humidity and temperature
  LoRa.print(temperature);        // Send temperature
  LoRa.endPacket();
  
  Serial.println("Humidity and temperature sent");
  
}
