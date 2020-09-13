"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enviroments_1 = require("../global/enviroments");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
// import kill from 'kill-port';
const socket = __importStar(require("../sockets/sockets"));
class Server {
    constructor() {
        this.start = (callback) => {
            this.httpServer.listen(this.port, callback());
            // kill(this.port)
            // .then(() => {
            //     console.log('kill port ok')
            // })
            // .catch(() => console.log('kill pot not found'));
        };
        this.app = express_1.default();
        this.port = enviroments_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.listenSockets();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    listenSockets() {
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
}
exports.default = Server;
