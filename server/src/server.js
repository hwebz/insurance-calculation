// server/src/server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')

// Assign environment variables
const port = process.env.PORT || 4000;
const endpoint = process.env.API_URL || '';
/**
 * Setup services
 */

// Initialize an express server
const app = express();

// parse application/json
app.use(bodyParser.json())

// Setup routes to response to client
app.post('/api/getProducts', async (req, res) => {
    try {
        if (!endpoint) {
            throw new Error('No api endpoint found!');
        }
        const response = await axios.post(endpoint + '/getProduct', req.body);
        if (response.status === 200 && response.data) {
            const productList = response.data.quotationProductList;
            return res.status(200).send({
                success: true,
                data: productList
            });
        } else {
            throw new Error('No response!')
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            error: error.message
        });
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));