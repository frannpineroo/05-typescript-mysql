import type { Application } from 'express';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default class Server {
    public app: express.Application;
    public port: number;

    constructor( port: number ) {
        this.port = port;
        this.app = express();
    }

    static init ( port: number ) {
        return new Server( port );
    }

    private publicFolder() {
        const publicPath = path.resolve( __dirname, '../public' );
        this.app.use( express.static( publicPath ) );
    }

    start ( callback?: (error?: Error) => void ) {
        this.app.listen( this.port, callback );
        this.publicFolder();
    }
}