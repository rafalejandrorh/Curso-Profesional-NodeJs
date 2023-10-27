const http = require('http');
const fs = require('fs');
const sharp = require('sharp');

const server = http.createServer(async (req, res) =>  {
    try {
        const inputImageStream = fs.createReadStream('./Files/images/STScI-01GA6KKWG229B16K4Q38CH3BXS.png');
        const grayscaleTransform = sharp().grayscale();
        
        inputImageStream.pipe(grayscaleTransform).pipe(res);
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify(error));
    }
})

server.listen(3001);