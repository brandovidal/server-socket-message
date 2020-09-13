// const conexion = require('../connection');
import {connection} from '../connection';

export default class Email {
    constructor() {}

    public obtener() {
        return new Promise((resolve, reject) => {
            connection.query(`select * from not_email_sent  LIMIT 10`,
                (err: Error, response: Response) => {
                    console.log(err, response);
                    if (err) reject(err);
                    else resolve(response);
                });
        });
    }
}

// module.exports = {
    // insertar(nombre, precio) {
    //     return new Promise((resolve, reject) => {
    //         conexion.query(`insert into not_email_sent
    //         (nombre, precio)
    //         values
    //         (?, ?)`,
    //             [nombre, precio], (err, resultados) => {
    //                 if (err) reject(err);
    //                 else resolve(resultados.insertId);
    //             });
    //     });
    // },
    // obtenerPorId(id) {
    //     return new Promise((resolve, reject) => {
    //         conexion.query(`select id, nombre, precio from not_email_sent where id = ?`,
    //             [id],
    //             (err, resultados) => {
    //                 console.log({resultados});
    //                 if (err) reject(err);
    //                 else resolve(resultados[0]);
    //             });
    //     });
    // },
    // actualizar(id, nombre, precio) {
    //     return new Promise((resolve, reject) => {
    //         conexion.query(`update not_email_sent
    //         set nombre = ?,
    //         precio = ?
    //         where id = ?`,
    //             [nombre, precio, id],
    //             (err) => {
    //                 if (err) reject(err);
    //                 else resolve();
    //             });
    //     });
    // },
    // eliminar(id) {
    //     return new Promise((resolve, reject) => {
    //         conexion.query(`delete from not_email_sent
    //         where id = ?`,
    //             [id],
    //             (err) => {
    //                 if (err) reject(err);
    //                 else resolve();
    //             });
    //     });
    // },
// }