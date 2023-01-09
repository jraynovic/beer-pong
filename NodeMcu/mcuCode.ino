#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266mDNS.h>


const char *WIFI_SSID = "wifi name";
const char *WIFI_PASSWORD = "wifipassword";
const char *serverName = "http://<your local ip>:5001";



WiFiClient client;
HTTPClient httpClient;
void setup()
{
    Serial.begin(9600);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {   
        delay(500);
        Serial.print(".");
    }
    Serial.println("Connected");
    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(5, INPUT_PULLUP);
    pinMode(4, INPUT_PULLUP);
    pinMode(0, INPUT_PULLUP);
    pinMode(2, INPUT_PULLUP);
    pinMode(14, INPUT_PULLUP);
    pinMode(12, INPUT_PULLUP);
}

void loop()
{
    int switchOne = digitalRead(5);
    int switchTwo = digitalRead(4);
    int switchThree = digitalRead(0);
    int switchFour = digitalRead(2);
    int switchFive = digitalRead(14);
    int switchSix = digitalRead(12);
    digitalWrite(LED_BUILTIN, HIGH);
    
    if(switchOne == LOW)
    {
        digitalWrite(LED_BUILTIN, LOW);
        Serial.println("Clicked");
        if(WiFi.status()== WL_CONNECTED){
            delay(500);
            WiFiClient client;
            HTTPClient http;
            http.begin(client, serverName);
            http.addHeader("Content-Type", "application/json");
            int httpResponseCode = http.POST("{\"1\":\"true\",\"device\":\"1\"}");
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
            http.end(); 
         }else{
            Serial.println("WIFI DISCONNECTED");
         }
    }
    if(switchTwo == LOW)
    {
        digitalWrite(LED_BUILTIN, LOW);
        Serial.println("Clicked");
        if(WiFi.status()== WL_CONNECTED){
            delay(500);
            WiFiClient client;
            HTTPClient http;
            http.begin(client, serverName);
            http.addHeader("Content-Type", "application/json");
            int httpResponseCode = http.POST("{\"2\":\"true\",\"device\":\"1\"}");
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
            http.end(); 
         }else{
            Serial.println("WIFI DISCONNECTED");
         }
    }
    if(switchThree == LOW)
    {
        digitalWrite(LED_BUILTIN, LOW);
        Serial.println("Clicked");
        if(WiFi.status()== WL_CONNECTED){
            delay(500);
            WiFiClient client;
            HTTPClient http;
            http.begin(client, serverName);
            http.addHeader("Content-Type", "application/json");
            int httpResponseCode = http.POST("{\"3\":\"true\",\"device\":\"1\"}");
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
            http.end(); 
         }else{
            Serial.println("WIFI DISCONNECTED");
         }
    }
    if(switchFour == LOW)
    {
        digitalWrite(LED_BUILTIN, LOW);
        Serial.println("Clicked");
        if(WiFi.status()== WL_CONNECTED){
            delay(500);
            WiFiClient client;
            HTTPClient http;
            http.begin(client, serverName);
            http.addHeader("Content-Type", "application/json");
            int httpResponseCode = http.POST("{\"4\":\"true\",\"device\":\"1\"}");
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
            http.end(); 
         }else{
            Serial.println("WIFI DISCONNECTED");
         }
    }
    if(switchFive == LOW)
    {
        digitalWrite(LED_BUILTIN, LOW);
        Serial.println("Clicked");
        if(WiFi.status()== WL_CONNECTED){
            delay(500);
            WiFiClient client;
            HTTPClient http;
            http.begin(client, serverName);
            http.addHeader("Content-Type", "application/json");
            int httpResponseCode = http.POST("{\"5\":\"true\",\"device\":\"1\"}");
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
            http.end(); 
         }else{
            Serial.println("WIFI DISCONNECTED");
         }
    }
    if(switchSix == LOW)
    {
        digitalWrite(LED_BUILTIN, LOW);
        Serial.println("Clicked");
        if(WiFi.status()== WL_CONNECTED){
            delay(500);
            WiFiClient client;
            HTTPClient http;
            http.begin(client, serverName);
            http.addHeader("Content-Type", "application/json");
            int httpResponseCode = http.POST("{\"6\":\"true\",\"device\":\"1\"}");
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
            http.end(); 
         }else{
            Serial.println("WIFI DISCONNECTED");
         }
    }
}