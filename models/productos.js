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
        console.log(await this.simulateProductbehavior(5))
        
    };
    getAllProducts = async ()=>{
        let productos  = JSON.parse( await readFileAsync(dataPath,'utf8'));
        return productos;
    };
    
    getProductByName = async(name)=>{
        let productos = JSON.parse( await readFileAsync(dataPath,'utf8'));
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
             rules:[
            {action:"add",setpricestep:0,daysremaining:11},
            {action:"add",setpricestep:0,daysremaining:0}
        ]
        }
        productos.push(productToSell);

        await writeFileAsync(dataPath,JSON.stringify(productos)) 
    }
    simulateProductbehavior = async (days)=>{ 
        let productos = await this.getAllProducts();
        
        let events = productos.map((product)=>{

            //console.log(product);
            //let value = product.rules.reduce(iterateOverRules,product);
            

            let myrule = product.rules.reduce((prev, curr)=>{ 
                return (Math.abs(curr.daysremaining - product.sellIn) < Math.abs( prev.daysremaining - product.sellIn )? curr: prev);
              
              });
              

              console.log(product.sellIn);
              console.log(myrule);
              //let getCorrectRule = rulesRemainingDay.reduce()
             
             //value.sellIn--;
            
            //console.log(value);
            
            let suituableRule = product.rules.reduce((acc,currentElement,output)=>{
                if(currentElement.daysremaining >= acc ){

                };

            },{});

        })
    }
    

     
}

/*
var closest = 
*/
let iterateOverRules = (product,currentElement,output)=>{   
    
     let evaluatedProduct= applyRules(currentElement,product)
    
    accumulator = evaluatedProduct; 
    return accumulator
} 
let applyRules = (rule,product)=>{
    if(product.sellIn >= rule.daysremaining){
        if(rule.action === "add" && product.price < 100){
            product.price = product.price + rule.setpricestep;
        }
        if(rule.action === "substract" && product.price > 0){
            product.price = product.price - rule.setpricestep;
        } 
    }

    return product;
}

module.exports = Product

/**
 * 
 *             product.rules.map((rule)=>{ 
                if(product.sellIn >= rule.daysremaining){
                    if(rule.action == "add" && product.price > 100){
                        product.price = product.price + parseInt(rule.setpricestep)
                    }
                    if(rule.action == "substract" && product.price < 0){
                        product.price = product.price - parseInt(rule.setpricestep)
                    }
                    console.log("apply logic")                    
                    console.log(product)                    
                }
                if(product.sellIn >= 0 ){
                    product.sellIn--;
                }
            })
 * **/