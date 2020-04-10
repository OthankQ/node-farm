const fs = require('fs');
const http = require('http');

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

const readData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const parsedData = JSON.parse(readData);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('You have asked for an overview page');
    } else if (pathName === '/product') {
        res.end('You have asked for a product page');
    } else if (pathName === '/api') {
        res.writeHead(202, {
            'Content-type': 'application/json'
        });
        res.end(readData);
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