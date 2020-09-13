"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const sockets_1 = require("../sockets/sockets");
const email_1 = __importDefault(require("../model/email"));
const email = new email_1.default();
const index_html_1 = require("../static/index.html");
exports.router = express_1.Router();
exports.router.get('/', (_req, res) => {
    console.log('Pagina Inicial');
    res.send(index_html_1.html);
});
exports.router.get('/email', (_req, res) => {
    console.log('Pagina email');
    email.obtener()
        .then(email => {
        console.log('email ', email);
        res.json({
            ok: true,
            body: {
                email
            }
        });
        // res.send('email Page', {email : email});
    })
        .catch(err => {
        return res.status(500).send('Error en el servidor');
    });
});
exports.router.get('/mensajes', (_req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });
});
exports.router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = { de, cuerpo };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
exports.router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
exports.router.get('/usuarios', (_req, res) => {
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            return res.json({ ok: false, err });
        }
        res.json({ ok: true, clientes });
    });
});
exports.router.get('/usuarios/detalle', (_req, res) => {
    res.json({ ok: true, clientes: sockets_1.usuariosConectados.getLista() });
});
