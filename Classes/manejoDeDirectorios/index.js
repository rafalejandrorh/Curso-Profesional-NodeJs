const fs = require('fs/promises');
const path = require('path');

async function main() {
    folder = './Files/folder';
    folderCopy = './Files/folderCopy';
    folderRemove = './Files/folderRemove';
    folderRenamed = './Files/folderRenamed';
    parentFolder = './Files/parentFolder';

    try {
        await fs.mkdir(folder);
        console.log(`Folder ${folder} created successfully`);
    } catch (error) {
        console.error('Error creating folder: ', error);
    }

    try {
        await fs.rename(folder, folderRenamed);
        console.log(`Folder ${folder} renamed to ${folderRenamed} successfully`);
    } catch (error) {
        console.error('Error renaming folder: ', error);
    }

    // Crear una carpeta dentro de otra
    try {
        await fs.mkdir(parentFolder);
        console.log(`Folder ${folder} created successfully`);

        await fs.rename(folderRenamed, path.join(parentFolder, 'folderRenamed'));
        console.log(`Folder ${folder} moved successfully`);
    } catch (error) {
        console.error('Error renaming folder: ', error);
    }
    
    // Copiar Carpeta con sus archivos a otra carpeta
    try {
        await copyFolder(folderCopy, folderRemove);
    } catch (error) {
        console.error('Error copying folder: ', error);
    }

    // Eliminar Carpeta con sus archivos
    try {
        await removeFolder(folderRemove);
    } catch (error) {
        console.error('Error removing folder: ', error);
    }
}

async function copyFolder(src, dest) {
    try {
       await fs.mkdir(dest);
       const files = await fs.readdir(src);
       
        for (const file of files) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            const stat = await fs.stat(srcPath);

            if(stat.isDirectory()) {
                await copyFolder(srcPath, destPath);
            }else{
                await fs.copyFile(srcPath, destPath);
            }
        }
    } catch (error) {
        console.error('Error copying folder: ', error);
    }
}

async function removeFolder(folderPath) {
    try {
       const files = await fs.readdir(folderPath);
       
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stat = await fs.stat(filePath);

            if(stat.isDirectory()) {
                await removeFolder(filePath);
            }else{
                await fs.unlink(filePath);
            }
        }

        await fs.rmdir(folderPath);
    } catch (error) {
        console.error('Error removing folder: ', error);
    }
}

main();