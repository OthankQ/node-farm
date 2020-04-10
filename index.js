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

const server = http.createServer((req, res) => {
    res.end('You have reached our server');
})
const port = '8000';

server.listen(port, '127.0.0.1', () => {
    console.log(`Listening to ${port}...`);
})