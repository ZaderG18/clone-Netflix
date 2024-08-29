document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Validação básica
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Envia os dados para o servidor usando Fetch API
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'usuarios.html'; // Redireciona para a página de usuários
        } else {
            alert('Credenciais inválidas.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao conectar ao servidor.');
    });
});
