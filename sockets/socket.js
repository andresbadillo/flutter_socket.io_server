const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
console.log('init server');

bands.addBand(new Band('DRÜX'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Maroon 5'));
bands.addBand(new Band('Guns \'n Roses'));

// console.log(bands);

/* Mensajes de sockets */
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje:', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje!' } );
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    /* Escuchar: add-band */
    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    /* Escuchar: delete-band */
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


    // client.on('emitir-mensaje', (payload) => {
    //     // console.log(payload);
    //     //io.emit('nuevo-mensaje', payload); // Emite a todos los clientes conectados
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });
});