const fs = require('fs');
const readableStream = fs.createReadStream('./Files/images/input.bmp');
const writableStream = fs.createWriteStream('./Files/images/output.bmp');

readableStream.on('data', (chunk) => {
    console.log(chunk);
    writableStream.write(chunk);
})

readableStream.on('end', () => {
    console.log('Fin de lectura del archivo');
    writableStream.end();
})

writableStream.on('finish', () => {
    console.log('Fin de escritura del archivo');
})

readableStream.on('error', () => {
    console.log('Error en la lectura');
})

writableStream.on('error', () => {
    console.log('Error en la escritura');
})