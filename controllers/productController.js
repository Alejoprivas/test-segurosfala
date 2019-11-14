
const fs = require('fs');
const Producto = require('../models/productos')



    // variables
const dataPath = process.env.PRODUCTPATH;
const rulePath = process.env.RULEPATH;

    // helper methods

exports.testFunction = async (req,res,next) =>{
    try{
        let producto = new Producto();
        let evaluatedProduct = await producto.testProduct();
     
        res.send(evaluatedProduct);
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