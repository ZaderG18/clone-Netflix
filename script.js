document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulário submetido');

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var cpf = document.getElementById("cpf").value;
    var celular = document.getElementById("celular").value;
    var senha = document.getElementById("senha").value;

    if (!nome || !email || !cpf || !celular || !senha) {
        console.log('Campos obrigatórios faltando');
        document.getElementById("mensagem").textContent = 'Todos os campos são obrigatórios!';
        return;
    }

    var dados = {
        nome: nome,
        email: email,
        cpf: cpf,
        celular: celular,
        senha: senha
    };

    // Simulando uma resposta do servidor
    setTimeout(function() {
        const simulatedResponse = {
            success: true
        };

        console.log('Resposta simulada:', simulatedResponse);
        if (simulatedResponse.success) {
            document.getElementById("mensagem").textContent = 'Cadastro realizado com sucesso!';
            document.getElementById('cadastroForm').reset();
        } else {
            document.getElementById("mensagem").textContent = 'Erro ao realizar cadastro.';
        }
    }, 1000);
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
