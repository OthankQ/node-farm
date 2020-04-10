const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'UTF-8');
const textOut = `This is what we know about avocado:\n${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOut);

console.log('File Created');