import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'joel0307',
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
