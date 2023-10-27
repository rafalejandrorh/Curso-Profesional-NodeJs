const fs = require('fs/promises');

async function main() {
    outputFile = './Files/output.txt';
    outputFileCopy = './Files/outputCopy.txt';
    inputFile = './Files/input.txt';
    inputFileRenamed = './Files/inputRenamed.txt';

    try {
        const data = await fs.readFile('./Files/archivo4.txt', 'utf-8');
        console.log('File content: ', data);
    } catch (error) {
        console.error('Error reading file: ', error);
    }

    try {
        await fs.writeFile(outputFile, 'Hello World!', 'utf-8');
        console.log(`File ${outputFile} created successfully`);

        await fs.writeFile(inputFile, 'utf-8');
        console.log(`File ${inputFile} created successfully`);
    } catch (error) {
        console.error('Error creating file: ', error);
    }

    try {
        await fs.copyFile(outputFile, outputFileCopy);
        console.log(`File ${outputFile} copied to ${outputFileCopy} successfully`);
    } catch (error) {
        console.error('Error copying file: ', error);
    }

    try {
        await fs.rename(inputFile, inputFileRenamed)
        console.log(`File ${inputFile} renamed to ${inputFileRenamed} successfully`);
    } catch (error) {
        console.error('Error renaming file: ', error);
    }

    try {
        await fs.unlink(inputFileRenamed)
        console.log(`File ${inputFileRenamed} deleted successfully`);
    } catch (error) {
        console.error('Error deleting file: ', error);
    }
}

main();