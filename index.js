const fs = require('fs');
const url = require('url');
const http = require('http');
const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////////////
// File

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {

//     if (err) return console.log(`There was an error, ${err}`);

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);

//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n ${data3}`, (err) => {
//                 console.log('File written.')
//             })
//         })
//     })
// })

// console.log('Will read file...');

///////////////////////////////
// Server
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    const {
        query,
        pathname
    } = url.parse(req.url, true);

    // Overview
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(202, {
            'Content-type': 'text/html'
        })

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

        // Product 
    } else if (pathname === '/product') {
        res.writeHead(202, {
            'Content-type': 'text/html'
        })
        const product = dataObj[query.id];

        const output = replaceTemplate(tempProduct, product);
        res.end(output);

        // API    
    } else if (pathname === '/api') {
        res.writeHead(202, {
            'Content-type': 'application/json'
        });
        res.end(readData);

        // Page Not Found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'our-own-header': 'hello-world'
        });

        res.end('<h1>Cannot find the requested page</h1>')
    }
})
const port = '8000';

server.listen(port, '127.0.0.1', () => {
    console.log(`//////////////\nListening to port ${port}...\n/////////////`);
})