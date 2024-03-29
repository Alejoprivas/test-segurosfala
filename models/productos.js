const fs = require('fs');
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

const dataPath = process.env.DATAPATH;

class Product{
    constructor (parameters = {}){
        
        let defaultRules = [
            {action:"add",setpricestep:1,daysremaining:1},
            {action:"substract",setpricestep:2,daysremaining:0}
        ];

        this.nombre =parameters.nombre || "";
        this.sellIn = parameters.sellIn || 0 ;
        this.price= parameters.price || 0;
        this.rules = parameters.rules || defaultRules;
    }


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
    sellNewProduct = async(name,sellIn,price,rules)=>{
        let selectedProduct = await this.getProductByName(name);
        let productos =  await this.getAllProducts();
        
        let productToSell = {
            nombre: name,
            sellIn: parseInt(sellIn),
            price: parseInt(price),
            rules: JSON.parse(rules)
        }
        console.log(productToSell)
        productos.push(productToSell);

        await writeFileAsync(dataPath,JSON.stringify(productos)) 
    }
    simulateProductbehavior = async (days)=>{ 
        let productos = await this.getAllProducts();
        let evaluatedProducts =[];

            for(let i=0;i<days;i++){ 
                evaluatedProducts[i] = productos.map((product)=>{
                    let applyCurrentRule = product.rules.reduce((prev, curr)=>{
                         
                        let daysLeft = Math.max(0,product.sellIn); 
                        
                        return (curr.daysremaining >= daysLeft && curr.daysremaining < prev.daysremaining  ? curr: prev);
                    });
                let newProduct = applyRule(applyCurrentRule,product);
                
                delete newProduct.rules;
                return newProduct;
                 }) 
                }               

        return evaluatedProducts;
    }

     
}
 
let iterateOverRules = (product,currentElement,output)=>{   
    
     let evaluatedProduct= applyRules(currentElement,product)
    
    accumulator = evaluatedProduct; 
    return accumulator
} 
let applyRule = (rule,product)=>{
    
    product.sellIn--;
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
    

    return Object.assign({},product);
}

 
module.exports = Product

 