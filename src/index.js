require('dotenv').config()
const express = require("express");
const http = require("http");
const { selectAQuotation } = require("./db-access");
const { logging } = require('selenium-webdriver');

const PORT = process.env.PORT;
const FILE_STORAGE_HOST = process.env.FILE_STORAGE_HOST;
const FILE_STORAGE_PORT = parseInt(process.env.FILE_STORAGE_PORT);

const app = express();

app.get("/quotation", async (req, res) => {
    let quotation = await selectAQuotation();
    quotation.name = "Socrates"; 
    res.status(200).json(quotation);
});

app.get("/image", async (req, res) => {
    const imagePath = req.query.path;
    
    const forwardRequest = http.request(
        {
            host : FILE_STORAGE_HOST,
            port: FILE_STORAGE_PORT,
            path: `/image?path=${imagePath}`,
            method: 'GET',
            headers: req.headers
        },
        forwardResponse => {
            res.writeHeader(forwardResponse.statusCode,forwardResponse.headers);
            forwardResponse.pipe(res);
        }
    );
    console.log(forwardRequest)
    req.pipe(forwardRequest);
});


app.listen(PORT, () => {
    console.log(`Quotation service is up and listening to port ${PORT}`);
});
