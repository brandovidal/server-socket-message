import express from 'express';
import { SERVER_PORT } from '../global/enviroments';
import socketIO from 'socket.io';
import http from 'http';
// import kill from 'kill-port';

import * as socket from '../sockets/sockets';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;
    

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.listenSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private listenSockets() {
        console.log('Escuchando conecciones - sockets');
        
        this.io.on('connection', cliente => {
            console.log('Nuevo cliente conectado', cliente.id);
            socket.conectarCliente(cliente, this.io);
            
            // configurar Usuario
            socket.configurarUsuario(cliente, this.io);

            // obtener Usuario
            socket.obtenerUsuario(cliente, this.io);

            // Mensaje
            socket.mensaje(cliente, this.io);

            // desconectar
            socket.desconectar(cliente, this.io);

        });
    }

    start = (callback: Function) => {
        this.httpServer.listen(this.port, callback());

        // kill(this.port)
        // .then(() => {
        //     console.log('kill port ok')
        // })
        // .catch(() => console.log('kill pot not found'));
    }
}