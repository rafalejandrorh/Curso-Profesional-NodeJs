const http = require('http');
const fs = require('fs/promises');
const sharp = require('sharp');

const server = http.createServer(async (req, res) =>  {
    try {
        const inputImage = await fs.readFile('./Files/images/STScI-01GA6KKWG229B16K4Q38CH3BXS.png');
        const outputImage = await sharp(inputImage).grayscale().toBuffer();

        res.writeHead(200, {
            'content-Type':'image/png'
        });
        res.end(outputImage);
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify(error));
    }
})

server.listen(3000);