const fs = require('fs');
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

const dataPath = process.env.DATAPATH;

class Product{
    constructor (parameters = {}){
        
        let defaultRules = [
            {action:"add",setpricestep:0,daysremaining:11},
            {action:"add",setpricestep:0,daysremaining:0}
        ];

        this.nombre =parameters.nombre;
        this.sellIn = parameters.sellIn;
        this.price= parameters.price;
        this.rules = parameters.rules || defaultRules;
    }


    testProduct = async ()=>{
        console.log(await this.sellNewProduct("Cobertura",5,5))

    };
    getAllProducts = async ()=>{
        let productos  = JSON.parse( await readFileAsync(dataPath,'utf8'));
        return productos;
    };
    
    getProductByName = async(name)=>{
        let productos = JSON.parse( await readFileAsync(dataPath,'utf8'));
        console.log("searching")
        let selectedProduct = productos.find((product)=>{
            return product.nombre;
        });
        return selectedProduct;
    }
    sellNewProduct = async(name,sellIn,price)=>{
        let selectedProduct = await this.getProductByName(name);
        let productos =  await this.getAllProducts();

        let productToSell = {
            nombre: name,
            sellIn: sellIn,
            price:price,
             defaultRules:[
            {action:"add",setpricestep:0,daysremaining:11},
            {action:"add",setpricestep:0,daysremaining:0}
        ]
        }
        productos.push(productToSell);
        console.log(productos)
    }


    
     
}

module.exports = Product