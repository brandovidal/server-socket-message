import { Socket } from 'socket.io';

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
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
export const configurarUsuario = (Cliente: Socket, io: SocketIO.Server) => {
    Cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        console.log('configurar usuario ', payload.nombre);
        io.emit('configurar-usuario', payload);
 
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });

    }); 
}