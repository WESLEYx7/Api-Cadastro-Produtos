import express from 'express';
import conexao from './conexao.js';

const app = express();
const porta = 3000;

// Middleware para analisar JSON
app.use(express.json());

// Rota para cadastrar um produto
app.post('/produtos', (req, res) => {
    const { nome_produto, preco_custo, preco_venda } = req.body;

    // Validação básica dos dados
    if (!nome_produto || typeof preco_custo !== 'number' || typeof preco_venda !== 'number') {
        return res.status(400).json({ error: 'Dados inválidos. Certifique-se de que todos os campos estão preenchidos corretamente.' });
    }

    // Consulta SQL para inserir o produto
    const sql = 'INSERT INTO produto (nome_produto, preco_custo, preco_venda) VALUES (?, ?, ?)';
    const values = [nome_produto, preco_custo, preco_venda];

    conexao.connection.query(sql, values, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erro ao inserir o produto no banco de dados.' });
        }
        res.status(201).json({ message: 'Produto cadastrado com sucesso!', id: results.insertId });
    });
});

// Endpoint principal
app.get('/', (req, res) => {
    res.send('<h2>Welcome to my world</h2>');
});

// Iniciar o servidor
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
