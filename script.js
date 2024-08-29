document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();


    // obtendo valores dos campos
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var cpf = document.getElementById("cpf").value;
    var celular = document.getElementById("celular").value;
    var senha = document.getElementById("senha").value;


    // valiação básica
    if (!nome || !email || !cpf || !celular || !senha) {
        document.getElementById("mensagem").textContent = 'Todos os campos são obrigatórios! ';
        return;
    }


    // Cria um objeto com os dados do formulário
    var dados = {
        nome: nome,
        email: email,
        cpf: cpf,
        celular: celular,
        senha: senha
    };


    // Envia os dados para o servidor usando Fetch API
    fetch('/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("mensagem").textContent = 'Cadastro realizado com sucesso!';
        } else {
            document.getElementById("mensagem").textContent = 'Erro ao realizar cadastro.';
        }
    })
    .catch((error) => {
        console.error('Erro:', error);
        document.getElementById("mensagem").textContent = 'Erro ao conectar ao servidor.';
    });
});