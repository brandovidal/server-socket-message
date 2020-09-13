import * as mysql from 'mysql';

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'repuestock_appdev'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('You are now connection');
});