document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const celular = document.getElementById("celular").value;
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !cpf || !celular || !senha) {
        document.getElementById("mensagem").textContent = 'Todos os campos são obrigatórios!';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("mensagem").textContent = 'Por favor, insira um email válido!';
        return;
    }

    const senhaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaPattern.test(senha)) {
        document.getElementById("mensagem").textContent = 'A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial!';
        return;
    }

    try {
        const response = await fetch('/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, cpf, celular, senha })
        });

        if (!response.ok) throw new Error('Erro na resposta do servidor');

        const data = await response.json();
        if (data.success) {
            document.getElementById("mensagem").textContent = 'Cadastro realizado com sucesso!';
            document.getElementById('cadastroForm').reset();
        } else {
            document.getElementById("mensagem").textContent = 'Erro ao realizar cadastro.';
        }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById("mensagem").textContent = 'Erro ao conectar ao servidor.';
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) throw new Error('Erro na resposta do servidor');

        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            window.location.href = 'usuarios.html';
        } else {
            alert('Credenciais inválidas.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar ao servidor.');
    }
});
