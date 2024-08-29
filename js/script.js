document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulário submetido');

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var cpf = document.getElementById("cpf").value;
    var celular = document.getElementById("celular").value;
    var senha = document.getElementById("senha").value;

    // Validação básica dos campos vazios
    if (!nome || !email || !cpf || !celular || !senha) {
        document.getElementById("mensagem").textContent = 'Todos os campos são obrigatórios!';
        return;
    }

    // Validação do email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("mensagem").textContent = 'Por favor, insira um email válido!';
        return;
    }

    // Validação da senha
    var senhaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaPattern.test(senha)) {
        document.getElementById("mensagem").textContent = 'A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial!';
        return;
    }

    console.log('Campos validados:', { nome, email, cpf, celular, senha });

    var dados = {
        nome: nome,
        email: email,
        cpf: cpf,
        celular: celular,
        senha: senha
    };

    // Envio dos dados para o servidor (simulação)
    fetch('/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do servidor:', data);
        if (data.success) {
            document.getElementById("mensagem").textContent = 'Cadastro realizado com sucesso!';
            document.getElementById('cadastroForm').reset();
        } else {
            document.getElementById("mensagem").textContent = 'Erro ao realizar cadastro.';
        }
    })
    .catch((error) => {
        console.error('Erro:', error);
        document.getElementById("mensagem").textContent = 'Erro ao conectar ao servidor.';
    });
});


// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/cadastrar', (req, res) => {
    console.log('Dados recebidos:', req.body);
    // Simulando uma resposta bem-sucedida
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
