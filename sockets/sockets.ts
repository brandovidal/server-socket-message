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