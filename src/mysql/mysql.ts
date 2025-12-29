import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';

export default class MySQL {
    private static _instance: MySQL;
    public pool: Pool;
    public conectado: boolean = false;

    private constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'node_user',
            password: 'Chainsawman35',
            database: 'node_mysql',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        
        this.conectarDB();
    }

    public static get instance(): MySQL {
        if (!MySQL._instance) {
            MySQL._instance = new MySQL();
        }
        return MySQL._instance;
    }

    private async conectarDB(): Promise<void> {
        try {
            const connection = await this.pool.getConnection();
            connection.release();

            this.conectado = true;
            console.log('Base de datos online');
        } catch (err) {
            console.log(err);
            throw new Error('Error al conectar con la base de datos');
        }
    }
}
