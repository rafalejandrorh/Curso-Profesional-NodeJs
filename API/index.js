const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./Config/index');
const { logErrors, errorHandler, boomErrorHandler } = require('./Middlewares/error.handler');
const notFoundHandler = require('./Middlewares/notFound.handler');

const app = express();
//const router = express.Router();
const PORT = config.port;

// Rutas
//const tweetsRouterV1 = require('./Routes/tweetsRouterV1');
//const tweetsRouterV2 = require('./Routes/tweetsRouterV2');
const v1 = require('./Routes/v1/index');
const v2 = require('./Routes/v2/index');

// Global Middlewares
app.use(cors({origin: config.dev ? '*' : config.clientsUrl}));
app.use(helmet());
app.use(express.json());

// Rutas versionadas
//tweetsRouterV1(app);
//tweetsRouterV2(app);
v1(app);
v2(app);

// Error 404
app.use(notFoundHandler);

// Error Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running in port: http://localhost:${PORT}`);
})