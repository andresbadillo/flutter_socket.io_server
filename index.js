const express = require('express');
const path = require('path');
require('dotenv').config();

/* App de Express */
const app = express();

/* Node server */
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

/* Mensajes de Sockets */
require('./sockets/socket');

/* Path público */
const publicPath = path.resolve( __dirname, 'public' );
app.use(express.static(publicPath));


server.listen( process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto:', process.env.PORT);
});

// Comandos para iniciar el servidor:
// npm start
// npm run start:dev