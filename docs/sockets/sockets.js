"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuario = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
exports.conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        const user = exports.usuariosConectados.borrarUsuario(cliente.id);
        // console.log('Borrar user ', user?.id, user?.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
// Listen message
exports.mensaje = (Cliente, io) => {
    Cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido ', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
// configurar usuario 
exports.configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        // io.emit('configurar-usuario', payload);
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    });
};
exports.obtenerUsuario = (cliente, io) => {
    cliente.on('obtener-usuarios', (payload, callback) => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
