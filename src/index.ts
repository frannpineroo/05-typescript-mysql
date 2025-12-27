import router from './router/router';
import Server from './server/server';

const server = Server.init( 3000 );
server.app.use( router );

server.start( () => {
    console.log( 'Servidor corriendo en el puerto 3000' );
});