const productController = require('../controllers/productController')
const productRoutes = (app) => {

    
    // READ
    app.get('/test', productController.testFunction);
    app.get('/productos', productController.getProducts);

    // CREATE NEW PRODUCT 
    app.post('/productos', productController.createProduct);
    
    // SELL PRODUCT
    app.get('/sellProducto',productController.sellProduct)
    

    // EVALUATE PRODUCT
    app.get('/evaluateProducts/:days', (req, res) => {
        
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
    
};




module.exports = productRoutes;