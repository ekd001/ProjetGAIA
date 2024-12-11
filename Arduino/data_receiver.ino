#include <Arduino.h>
#include <Esp.h>

//Networking modules
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

// Include necessary libraries

#include <SPI.h>  // Required for SPI communication
#include <LoRa.h> // LoRa library for Arduino

//Wifi credentials and server details
const char* ssid = "GPC9979";
const char* password ="12345678";
const char* serverName = "http://192.168.137.1:8000/api/SensorDataCreate/";

// Define LoRa module pins
#define SS_PIN 15  // Slave Select pin
#define RST_PIN -1 // Reset pin (not used in this setup)
#define DIO0_PIN 5 // DIO0 pin (used for receive callback)

// Define LoRa frequency (868.1 MHz for Europe)
#define LORA_FREQUENCY 868.1E6 // Frequency in Hz

// Data structure for the sensor data
struct SensorData {
  float humidity;
  float temperature;
};
SensorData sensorData; // Variable to recuperate the sensor data



void setup()
{ 
  // Initialize serial communication
  Serial.begin(115200);
  while (!Serial); // Wait for serial port to connect. Needed for native USB port only

  Serial.println("LoRa Bidirectional Communication (868.1 MHz)");
  ESP.wdtEnable(0);
  
  

  // Configure LoRa transceiver module
  LoRa.setPins(SS_PIN, RST_PIN, DIO0_PIN);

  // Initialize LoRa
  if (!LoRa.begin(LORA_FREQUENCY))
  {
    Serial.println("LoRa initialization failed. Check your connections.");
    while (1)
      ; // If failed, do nothing
  }

  // Set LoRa parameters
  LoRa.setSpreadingFactor(12); // Set spreading factor (6-12). Higher SF increases range but decreases data rate
  LoRa.setSyncWord(0xF3);      // Set sync word to ensure communication only between nodes with the same sync word

  Serial.println("LoRa initialization successful.");

  // connect to the wifi
  connectWiFi(ssid, password);

  
}

void loop(){
  // Check for any incoming LoRa data
  int packetSize = LoRa.parsePacket();
  if (packetSize)
  {                   // If a packet is received
    sensorData = receiveFactorData(); // Call function to handle the received message
    sendDataToServer(serverName, sensorData); // call to send data to the server
  }
  delay(5000);
  ESP.wdtFeed();
 
  
}

// Function to receive and process a LoRa message
SensorData receiveFactorData()
{
  SensorData data = {0.0,0.0};
  String receivedData = ""; // Variable to store the received message

  // Read the packet
  while (LoRa.available()) {
    receivedData += (char)LoRa.read(); // Read each byte and build the string
  }

  // If something was received
  if (receivedData.length() > 0) {
    int separatorIndex = receivedData.indexOf(',');  // Find the separator (comma)

    // Extract humidity and temperature from the received string
    data.humidity = receivedData.substring(0, separatorIndex).toFloat();  // Humidity
    data.temperature = receivedData.substring(separatorIndex + 1).toFloat();  // Temperature

    // Print the received humidity and temperature
    Serial.print("Received humidity: ");
    Serial.println(data.humidity);

    Serial.print("Received temperature: ");
    Serial.println(data.temperature);
  
  // Print the RSSI (Received Signal Strength Indicator)
  Serial.print("RSSI: ");
  Serial.println(LoRa.packetRssi()); // Get and print the RSSI of the received packet
  }
  return data;
}

//fonction to connect to the wifi
void connectWiFi(const char* ssid, const char* password){
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.println("....");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address : ");
  Serial.println(WiFi.localIP());
}

//fonction to send the Json Object
void sendDataToServer(const char* serverName, SensorData data){
  //check WiFi connection status
  if(WiFi.status() == WL_CONNECTED){
    WiFiClient client;
    HTTPClient http;

    // Your Domain name with URL path or IP address with path
    http.begin(client, serverName);

    // Specify content-type header
    http.addHeader("content-Type", "application/json");

    // Create Json object
    StaticJsonDocument<200> doc;
    doc["humidity"] = data.humidity;
    doc["temperature"] = data.temperature;

    // Serialize JSON to String
    String httpRequestData;
    serializeJson(doc, httpRequestData);

    // Send HTTP POST request
    int httpResponseCode = http.POST(httpRequestData);

    // Check the returning code
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    // Free resources
    http.end();
  }else{
    Serial.println("WiFi Disconnected");
  }
  
}
