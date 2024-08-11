import mysql from 'mysql2/promise';

//Casa = 1234

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'novo'
});

async function mostrarTabelas() {
    try {
        const [results] = await connection.execute('SELECT * FROM produto');
        return results;
    } catch (error) {
        throw console.log(`Deu algo errado na consulta por ${error}`);
    }
}

export default { mostrarTabelas, connection };
