
# Seguros Falabella Test Entrevista

  

Api-rest simple para test de seguros falabella

  

## Como hacer deploy

Primero se debe generar la imagen usando el siguiente compando:

docker build -t alev2/node-web-app .

  

Luego se debe correr la imagen usando el siguiente comando:

docker run -p 8080:8080 -d alev2/node-web-app

  

## Usando Postman

Asegurase que el metodo post este seteado con el formato `x-www-form-urlencoded`

  

 * Listar Productos (Get): `/productos`
	* Lista los productos agregados.

 * Evaluar producto (Get): `/evaluateProducts/{dias}
	* Simula los cambios de precios cada dia para cada producto agregado

 * Agregar producto (Post): `/createProduct
	* Para agregar un producto se debe ingresar varios parametros:
		* Estructura de un producto:

		      {
		        "nombre": nombre del producto,
		        "sellIn": cuenta regresiva hasta que el producto vence,
		        "price": precio del producto,
		        "rules":[
			        //reglas que permiten cambiar el comportamiento del producto mientras pasa el tiempo
			        {
			        "action":si suma o resta,
			        "setpricestep":cantidad que va sumar o restar,"
			        "daysremaining":dias hasta que se vence el producto
			        },
		        ]
		      }
			

 * Exsisten tres reglas:
	 * add: suma setpricestep por cada dia que pase
	 * substract: resta setpricestep por cada dia que pase
	 * daysremaining: cuando sellin sea igual o menor la regla empezara a aplicar.

Ejemplo:

		      {
		        "nombre": "Full cobertura Super duper",
		        "sellIn": 6,
		        "price": 0,
		        "rules":[
        {"action":"add","setpricestep":1,"daysremaining":11},
        {"action":"substract","setpricestep":2,"daysremaining":10},
        {"action":"add","setpricestep":3,"daysremaining":5},
        {"action":"add","setpricestep":3,"daysremaining":1},
        {"action":"equalize","setpricestep":0,"daysremaining":0}
    ]
	}   
		


			
		
