const fs = require('fs/promises');

async function readFile() {
    try {
        const data1 = await fs.readFile('./Files/archivo1.txt', 'utf8');
        console.log('Contenido del archivo1: ', data1);

        const data2 = await fs.readFile('./Files/archivo2.txt', 'utf8');
        console.log('Contenido del archivo1: ', data2);

        const data3 = await fs.readFile('./Files/archivo3.txt', 'utf8');
        console.log('Contenido del archivo1: ', data3);

    } catch (error) {
        console.log('Error en la lectura de los archivos:', error);
    }
}

readFile();