
const fs = require('fs');
const Producto = require('../models/productos')



    // variables
const dataPath = process.env.PRODUCTPATH;

    // helper methods

exports.prettyPrint = async (req,res,next) =>{
    try{
        let producto = new Producto();
        let evaluatedProduct = await producto.testProduct();
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
        next(e)
    }
}


exports.getProducts = async (req, res) => {

    try{
        let producto = new Producto();
        let products = await producto.getAllProducts();  
        res.send(products);
    }catch(e){
        next(e)
    }
}

exports.createProduct = (req, res) => {

        
    readFile(data => { 
        const newProductId = Object.keys(data).length + 1;

        data[newProductId.toString()] = req.body;

        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send('new product added');
        });
    },
        true);
        
}

exports.sellProduct = async (req, res) => {

    try{
        let producto = new Producto();
        let products = await producto.getAllProducts();  
        res.send(products);
    }catch(e){
        res.send(e);
    }
        
}

exports.evaluateProduct = async (req,res) =>{
    try{
        let producto = new Producto();
        let products = await producto.testProduct();  
        
        res.send(products);
    }catch(e){
        res.send(e)
    }
}