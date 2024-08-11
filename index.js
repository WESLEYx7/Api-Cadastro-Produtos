import express from 'express';
import conexao from './conexao.js';

const app = express();
const porta = 3000;

// Para aplicação utilizar json
app.use(express.json());


// Rota para criar um pedido
app.post('/pedidos', async (req, res) => {
    const { id_usuario, id_produto, quantidade } = req.body;

    // Validação
    if (!id_usuario || !id_produto || !quantidade) {
        return res.status(400).json({ error: 'Dados inválidos. Certifique-se de que todos os campos estão preenchidos corretamente.' });
    }

    // Rota para criar um pedido!
    const sql = 'INSERT INTO pedido (id_usuario, id_produto, quantidade) VALUES (?, ?, ?)';
    const values = [id_usuario, id_produto, quantidade];

    try {
        const [results] = await conexao.connection.execute(sql, values);
        res.status(201).json({ message: 'Pedido registrado com sucesso!', id: results.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar o pedido no banco de dados.' });
    }
});


// Rota para criar um produto!
app.post('/produtos', async (req, res) => {
    const { nome_produto, preco_custo, preco_venda, quantidade } = req.body;

    // Verifica dos campos
    if (!nome_produto || preco_custo === undefined || preco_venda === undefined, !quantidade) {
        return res.status(400).json({ error: 'Dados inválidos. Certifique-se de que todos os campos estão preenchidos corretamente.' });
    }

    // Query SQL para inserir os dados
    const sql = 'INSERT INTO produto (nome_produto, preco_custo, preco_venda, quantidade) VALUES (?, ?, ?, ?)';
    const values = [nome_produto, preco_custo, preco_venda, quantidade];

    try {
        // Executando a query
        const [results] = await conexao.connection.execute(sql, values);
        
        // Retorna 201 se houve sucesso
        res.status(201).json({ message: 'Produto registrado com sucesso', id: results.insertId });
    } catch (error) {
        console.error(error); // Exibe o erro se der problema na inserção
        res.status(500).json({ error: 'Falha ao inserir no banco de dados' });
    }
});



// Endpoint raiz teste
app.get('/', (req, res) => {
    res.send('<h2>Testannnndoooo</h2>');
});



// Rota para mostrar produtos!
app.get('/produtos', async (req, res) => {
    try {
        const resultado = await conexao.mostrarTabelas();
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
});


// Encerramento da aplicação
process.on('SIGINT', async () => {
    console.log('Encerrando o servidor...');
    await conexao.connection.end();
    process.exit(0);
});


// Rota para mostrar usuarios
app.get('/usuarios', async (req, res) => {

    try {
        const [results] = await conexao.connection.execute('SELECT * FROM usuario');
        res.status(201).json(results); 
    } catch (error) {
        console.error(`Erro na busca ${message.error}`);
        return res.status(500).json({message: 'Erro interno!'});
    }
    
})


// Rota para criar um usuário
app.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;

    // Validação
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Dados inválidos. Certifique que os dados foram enviados corretamente' });
    }

    // Consulta SQL para inserir o usuário
    const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
    const values = [nome, email, senha];

    try {
        const [results] = await conexao.connection.execute(sql, values);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: results.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao inserir o usuário no banco de dados.' });
    }
});



// Testando funcionamento do servidor
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});