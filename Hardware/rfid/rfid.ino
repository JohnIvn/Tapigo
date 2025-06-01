#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <ArduinoWebsockets.h>
 
#define SS_PIN 5      // SDA
#define RST_PIN 4     // RST
#define LEDPIN 2
// PIN 18 SCK
// PIN 19 MISO115
// PIN 23 MOSI
// 3.3v and GND

const char* ssid = "huh?";
const char* password = "@tam2407";
const char* websocket_server = "ws://192.168.101.29:4000";
// const char* ssid = "ZTE_2.4G_emHexQ";
// const char* password = "ex3pFTqm";
// const char* websocket_server = "ws   ://192.168.1.4:4000";
// const char* ssid = "A";
// const char* password = "aaaaaaaaa";
// const char* websocket_server = "ws://192.168.216.5:3001";
MFRC522 rfid(SS_PIN, RST_PIN);

using namespace websockets;
WebsocketsClient client;

void onMessageCallback(WebsocketsMessage message) {
    Serial.print("Received from server: ");
    Serial.println(message.data());
    if (message.data() == "restart") {
        ESP.restart();  // Restart ESP32
    }
}


void setup() {  
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    pinMode(LEDPIN, OUTPUT);

    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("\nConnected to WiFi");

    client.onMessage(onMessageCallback);

    Serial.println("Connecting to WebSocket Server...");
    if (client.connect(websocket_server)) {
        Serial.println("Connected to WebSocket Server!");
        client.send("Hello from ESP32!");
    } else {
        Serial.println("WebSocket Connection Failed!");
    }

    SPI.begin(18, 19, 23, SS_PIN); // SCK, MISO, MOSI, SS
    rfid.PCD_Init();

    Serial.println("RFID Scanner Ready!");
}

void loop() {
    if (!client.available()) {  // Check if WebSocket is disconnected
        Serial.println("WebSocket Disconnected! Reconnecting...");
        client.connect( websocket_server);
        if (client.available()) {
            Serial.println("Reconnected!");
            client.send("ESP32 Reconnected!");
        }
    }

    client.poll(); 

    if (!rfid.PICC_IsNewCardPresent()) return;
    if (!rfid.PICC_ReadCardSerial()) return;
    
    Serial.print("Card UID: ");
    String cardID = "";         
    for (byte i = 0; i < rfid.uid.size; i++) {
        Serial.print(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
        Serial.print(rfid.uid.uidByte[i], HEX);
        Serial.print(" ");
        rapidBlink();

        cardID += String(rfid.uid.uidByte[i], HEX);
    }
    Serial.println();

    if (client.available()) {
        client.send("Card Scanned: " + cardID);
    }

    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
}

void rapidBlink(){
  
  for (int i = 0; i < 5; i++){
        digitalWrite(LEDPIN, HIGH); // sets the digital pin 13 on
        delay(50);            // waits for a second
        digitalWrite(LEDPIN, LOW);
        delay(50);            // waits for a second
  }
}