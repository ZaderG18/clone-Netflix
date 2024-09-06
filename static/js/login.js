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
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      if (data.success) {
        window.location.href = 'usuarios.html';
      } else {
        alert('Credenciais inválidas.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert(`Erro ao conectar ao servidor: ${error.message}`);
    }
  });