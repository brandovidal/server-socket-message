// const conexion = require('../connection');
import {connection} from '../connection';

export default class User {
    constructor() {}

    public obtener() {
        return new Promise((resolve, reject) => {
            connection.query(`select * from user  LIMIT 10`,
                (err: Error, response: Response) => {
                    console.log(err, response);
                    if (err) reject(err);
                    else resolve(response);
                });
        });
    }
}