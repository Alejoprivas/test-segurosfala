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
        console.log(await this.simulateProductbehavior(15))
        
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
        
        for(let i=days;i>0;i--){
            console.log("day:"+i);
            let events = productos.map((product)=>{
                
                let applyCurrentRule = product.rules.reduce((prev, curr)=>{ 
                    let daysLeft = Math.max(0,product.sellIn); 
                    
                    //return (Math.abs(curr.daysremaining - daysLeft) < Math.abs( prev.daysremaining - daysLeft) ? curr: prev);
                    return (curr.daysremaining >= daysLeft && curr.daysremaining < prev.daysremaining  ? curr: prev);
                });
                
            let newProduct = applyRule(applyCurrentRule,product);
            newProduct.sellIn--;
            return newProduct;
        })
         console.log(events)
        }
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
let applyRule = (rule,product)=>{
        if(rule.action === "add"){
            let calculatePrice = product.price + rule.setpricestep;

            product.price = calculatePrice <= 100 ? calculatePrice : 100 ;
        }
        if(rule.action === "substract"){
            let calculatePrice = product.price - rule.setpricestep;
            product.price = calculatePrice >= 0 ? calculatePrice : 0 ; 
        } 
        if(rule.action === "equalize"){
            product.price = rule.setpricestep;
        }
    

    return product;
}


//binary search 

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