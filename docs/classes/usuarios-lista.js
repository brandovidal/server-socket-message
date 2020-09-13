"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    agregar(usuario) {
        this.lista = [...this.lista, usuario];
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (const usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('====== Actualizando usuario =======');
        console.log(this.lista);
    }
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    borrarUsuario(id) {
        const tmpUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tmpUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
