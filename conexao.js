import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'novo'
});

connection.connect();

function mostrarTabelas(callback) {
    connection.query('SELECT * FROM produto', (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
}

export default { mostrarTabelas, connection };
