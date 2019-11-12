
const productRoutes = require('./productRoutes');

const appRouter = (app) => {

    app.get('/', (req, res) => {
        res.send('test');
    });


    productRoutes(app);
}; 
module.exports = appRouter;