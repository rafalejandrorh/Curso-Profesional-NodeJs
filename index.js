const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hola mundo');
})

app.get('/json', (req, res) => {
    res.json({
        mensaje:'Hola mundo'
    });
})

app.post('/request/:id', (req, res) => {
    const requestObject = {
        body: req.body,
        cookies: req.cookies,
        hostname: req.hostname,
        ip: req.ip,
        method: req.method,
        params: req.params,
        path: req.path,
        protocol: req.protocol,
        query: req.query,
        secure: req.secure,
        contentType: req.get('Content-Type'),
        isJson: req.is('json')
    };
    res.json(requestObject);
})

app.get('/response', (req, res) => {
    res.cookie('key', 'value');
    res.set('X-Custom-Header', 'ASMAT');
    res.status(200);
    res.json({
        message:'Response con Headers y Cookies'
    });
})

app.listen(PORT, () => {
    console.log(`Server is running in port: http://localhost:${PORT}`);
})