//Incluindo bibliotecas
#include <WiFi.h>
#include <WebServer.h>

//Definindo porta dos leds
#define led_amarelo 1
#define led_azul 2

//Definindo nome da rede e senha
const char* ssid = "SHARE-RESIDENTE";
const char* password = "Share@residente";

//Setando porta do servidor
WebServer server(80);

//Função que acende e apaga o led amarelo caso o jogador X ganhe
void winX(){
  digitalWrite(led_azul, LOW);
  digitalWrite(led_amarelo, LOW);
  delay(5);
  digitalWrite(led_amarelo, HIGH);
  delay(300);
  digitalWrite(led_amarelo, LOW);
  delay(300);
  digitalWrite(led_amarelo, HIGH);
  delay(300);
  digitalWrite(led_amarelo, LOW);
  delay(300);
  digitalWrite(led_amarelo, HIGH);
  delay(300);
  digitalWrite(led_amarelo, LOW);
}


//Função que acende e apaga o led azul caso o jogador O ganhe
void winO(){
  digitalWrite(led_azul, LOW);
  digitalWrite(led_amarelo, LOW);
  delay(5);
  digitalWrite(led_azul, HIGH);
  delay(300);
  digitalWrite(led_azul, LOW);
  delay(300);
  digitalWrite(led_azul, HIGH);
  delay(300);
  digitalWrite(led_azul, LOW);
  delay(300);
  digitalWrite(led_azul, HIGH);
  delay(300);
  digitalWrite(led_azul, LOW);
}

// Função que acende e apaga os dois leds caso haja empate
void draw(){
  digitalWrite(led_azul, HIGH);
  digitalWrite(led_amarelo, HIGH);
  delay(300);
  digitalWrite(led_azul, LOW);
  digitalWrite(led_amarelo, LOW);
  delay(300);
  digitalWrite(led_azul, HIGH);
  digitalWrite(led_amarelo, HIGH);
  delay(300);
  digitalWrite(led_azul, LOW);
  digitalWrite(led_amarelo, LOW);
  delay(300);
  digitalWrite(led_azul, HIGH);
  digitalWrite(led_amarelo, HIGH);
  delay(300);
  digitalWrite(led_azul, LOW);
  digitalWrite(led_amarelo, LOW);
}

//Função que deixa o led amarelo aceso caso seja a vez do X jogar
void turnX(){
  digitalWrite(led_azul, LOW);
  digitalWrite(led_amarelo, HIGH);
}

//Função que deixa o led azul aceso caso seja a vez do O jogar
void turnO(){
  digitalWrite(led_amarelo, LOW);
  digitalWrite(led_azul, HIGH);
}

void setup() {
  Serial.begin(115200);
  pinMode(led_amarelo, OUTPUT);
  pinMode(led_azul, OUTPUT);
  // Connect to Wi-Fi network with SSID and password
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  //Rotas que, ao serem recebidas as requisições, executam determinada função no arduíno
  server.on("/winX", winX);
  server.on("/winO", winO);
  server.on("/draw", draw);
  server.on("/turnX", turnX);
  server.on("/turnO", turnO);
  server.begin();

}


void loop() {
server.handleClient();

}