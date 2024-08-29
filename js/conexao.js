const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.json());

// Endpoint que aceita requisições POST
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    // Adicione a lógica de autenticação aqui
    res.json({ success: true });
});

// Endpoint que aceita requisições POST
app.post('/cadastrar', (req, res) => {
    const { nome, email, cpf, celular, senha } = req.body;
    // Adicione a lógica de cadastro aqui
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
