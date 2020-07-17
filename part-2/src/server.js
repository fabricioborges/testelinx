const service = require('../src/app/services/images');

function read() {
    console.log('read');
    service.readFile();
}

read();