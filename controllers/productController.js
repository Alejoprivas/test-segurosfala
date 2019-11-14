
const fs = require('fs');
const Producto = require('../models/productos')



    // variables
const dataPath = process.env.PRODUCTPATH;

    // helper methods

exports.prettyPrint = async (req,res,next) =>{
    try{
        let producto = new Producto();

        console.log(req.params);
        let evaluatedProduct = await producto.simulateProductbehavior(req.params.days);
        let table="" ;
        
        for(let i = 0; i<evaluatedProduct.length;i++){
            table += `--------Dia: ${i} --------<br>`;
            table += `Nombre, SellIn, Price <br>`;
            evaluatedProduct[i].forEach(producto => {
                table += `${producto.nombre}, ${producto.sellIn} , ${producto.price} <br>`;    
            }); 
            table += `--------Final de dia --------<br>`;
        }
        
        res.send(table);
    }catch(e){
        res.send("Unexpected Error")
    }
}


exports.getProducts = async (req, res) => {

    try{
        let producto = new Producto();
        
        let products = await producto.getAllProducts();
        let productsAvailable = products.map((product)=>{

            delete product.rules;
            return product
        })   
        res.send(productsAvailable);
    }catch(e){
        console.log(e)
        res.send("Unexpected Error")
    }
}

exports.createProduct = (req, res) => {
    try{
        let producto = new Producto();
        let newProduct  = req.body
        producto.sellNewProduct(newProduct.nombre,newProduct.sellIn,newProduct.price,newProduct.rules);
        res.send("Se agrego un nuevo producto");
    }catch(e){
        console.log(e)
        res.send("Unexpected Error")
    }

   /*     
    readFile(data => { 
        const newProductId = Object.keys(data).length + 1;

        data[newProductId.toString()] = req.body;

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send('new product added');
        });
    },
        true);
     */   
}

exports.sellProduct = async (req, res) => {

    try{
        let producto = new Producto();
        let products = await producto.getAllProducts();  
        res.send(products);
    }catch(e){

        res.send("Unexpected Error")
    }
        
}

exports.evaluateProduct = async (req,res) =>{
    try{
        let producto = new Producto();
        let products = await producto.simulateProductbehavior(req.params.days);  
        
        res.send(products);
    }catch(e){ 
        res.send("Unexpected Error")
    }
}