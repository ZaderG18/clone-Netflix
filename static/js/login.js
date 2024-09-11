// Função para cadastrar um novo usuário
function cadastrarUsuario(email, senha) {
  // Obtém os usuários cadastrados do localStorage ou inicializa uma lista vazia
  var usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];

  // Adiciona o novo usuário à lista
  usuariosCadastrados.push({ email: email, senha: senha });

  // Salva a lista atualizada no localStorage
  localStorage.setItem('usuariosCadastrados', JSON.stringify(usuariosCadastrados));
  console.log('Usuário cadastrado:', { email: email, senha: senha });
}

// Função para validar o login
function validarLogin() {
  // Obtém os valores dos campos de email e senha
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;

  // Obtém os usuários cadastrados do localStorage
  var usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
  console.log('Usuários cadastrados:', usuariosCadastrados);

  // Verifica se o email e a senha correspondem a um usuário cadastrado
  var usuarioEncontrado = usuariosCadastrados.find(function(usuario) {
      return usuario.email === email && usuario.senha === senha;
  });

  // Mensagens e redirecionamento baseados na validação
  if (usuarioEncontrado) {
      alert('Sucesso!');
      window.location.href = "telaInicial.html";
  } else {
      alert('Usuário ou senha incorretos!');
  }
}

// Função para mostrar ou esconder a senha
function mostrarSenha() {
  var inputPass = document.getElementById('senha');
  var btnShowPass = document.getElementById('btn-senha');

  if (inputPass.type === 'password') {
      inputPass.setAttribute('type', 'text');
      btnShowPass.classList.replace('bi-eye', 'bi-eye-slash');
  } else {
      inputPass.setAttribute('type', 'password');
      btnShowPass.classList.replace('bi-eye-slash', 'bi-eye');
  }
}

// Função para manipular o checkbox "Lembrar de mim"
document.addEventListener('DOMContentLoaded', function () {
  const lembrarCheckbox = document.querySelector('input[type="checkbox"]');

  // Verifica se o estado "Lembrar de mim" está salvo no localStorage
  const lembrar = localStorage.getItem('lembrar');
  if (lembrar === 'true') {
      lembrarCheckbox.checked = true;
      console.log('Lembrar de mim já estava ativado');
  } else {
      lembrarCheckbox.checked = false;
      console.log('Lembrar de mim desativado por padrão');
  }

  lembrarCheckbox.addEventListener('change', function () {
      if (this.checked) {
          console.log('Lembrar de mim ativado');
          localStorage.setItem('lembrar', 'true');
      } else {
          console.log('Lembrar de mim desativado');
          localStorage.setItem('lembrar', 'false');
      }
  });
});
