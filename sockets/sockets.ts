import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        const user = usuariosConectados.borrarUsuario(cliente.id);
        console.log('Borrar user ', user?.id, user?.nombre);
    });
}

// Listen message
export const mensaje = (Cliente: Socket, io: SocketIO.Server) => {
    Cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje recibido ', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

// configurar usuario 
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        // io.emit('configurar-usuario', payload);
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    }); 
}