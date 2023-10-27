const fs = require('fs/promises');
const EventEmitter = require('events');

class FileReadEmitter extends EventEmitter {
    async readFile(file) {
        this.emit('beforeRead', file);
        try {
            const data = await fs.readFile(file, 'utf-8');
            this.emit('read', file, data);
        } catch (error) {
            this.emit('error', error);
        }
    }
}

const fileReadEmitter = new FileReadEmitter();

fileReadEmitter.on('read', (file, data) => {
    console.log(`File ${file} read successfully`, data);
});

fileReadEmitter.on('error', (error) => {
    console.log(`There was an error: ${error.message}`);
});

fileReadEmitter.on('beforeRead', (file) => {
    console.log(`Reading file ${file}`);
});

(async () => {
    await fileReadEmitter.readFile('./Files/archivo1.txt');
    await fileReadEmitter.readFile('./Files/archivo2.txt');
    await fileReadEmitter.readFile('./Files/archivo3.txt');
})();