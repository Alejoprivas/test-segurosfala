# Seguros Falabella Test Entrevista

Api-rest simple para test de seguros falabella

## Como hacer deploy
Primero se debe generar la imagen usando el siguiente compando:
    
    docker build -t alev2/node-web-app .

Luego se debe correr la imagen usando el siguiente comando: 
    
    docker run -p 8080:8080 -d alev2/node-web-app
    
## Postman