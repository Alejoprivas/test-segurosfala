const productController = require('../controllers/productController')
const productRoutes = (app) => {
    // READ
    app.get('/test', productController.prettyPrint);

    app.get('/productos', productController.getProducts);
    // CREATE NEW PRODUCT 
    app.post('/productos', productController.createProduct);
    // SELL PRODUCT
    app.get('/sellProducto',productController.sellProduct)
    // EVALUATE PRODUCT
    app.get('/evaluateProducts/:days',productController.evaluateProduct);
    
};




module.exports = productRoutes;