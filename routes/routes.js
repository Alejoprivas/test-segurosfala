
const productRoutes = require('./productos');

const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('test');
    });


    productRoutes(app, fs);
}; 
module.exports = appRouter;