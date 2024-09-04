const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8000;

app.use(express.json());

// Simulando banco de dados para usuários
const users = []; 

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    bcrypt.compare(senha, user.senha, (err, result) => {
        if (err || !result) return res.status(401).json({ error: 'Credenciais inválidas' });

        // Gerar um token JWT (exemplo simples)
        const token = jwt.sign({ email: user.email }, 'secreta', { expiresIn: '1h' });
        res.json({ success: true, token });
    });
});

app.post('/cadastrar', (req, res) => {
    const { nome, email, cpf, celular, senha } = req.body;
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'Usuário já cadastrado' });
    }

    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Erro ao cadastrar' });

        users.push({ nome, email, cpf, celular, senha: hashedPassword });
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
