
const productRoutes = (app, fs) => {

    // variables
    const dataPath = process.env.DATAPATH;

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/productos', (req, res) => {
        
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/productos', (req, res) => {

        
        readFile(data => { 
            const newProductId = Object.keys(data).length + 1;

            data[newProductId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new product added');
            });
        },
            true);
            
    });


    // UPDATE
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
};

module.exports = productRoutes;