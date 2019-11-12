
const fs = require('fs');
const Producto = require('../models/productos')



    // variables
const dataPath = process.env.DATAPATH;

    // helper methods

exports.testFunction = async (req,res,next) =>{
    try{
        let producto = new Producto();
        await producto.testProduct();  
        res.send('Sample controller test')
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
        next(e)
    }
        
}

/**
 *     // UPDATE
    app.put('/productos/:id', (req, res) => {

        readFile(data => {

            
            const productId = req.params["id"];
            data[productId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`productos id:${productId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/productos/:id', (req, res) => {

        readFile(data => {

            const productId = req.params["id"];
            delete data[productId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`productos id:${productId} removed`);
            });
        },
            true);
    });
 **/