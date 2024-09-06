const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const port = 8000;
const JWT_SECRET = process.env.SECRET_KEY;
const JWT_REFRESH_SECRET = process.env.REFRESH_SECRET_KEY;

app.use(express.json());

// Conectar ao MongoDB (substitua com sua URL do MongoDB)
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo de usuário
const userSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  cpf: { type: String, unique: true },
  celular: String,
  senha: String,
  refreshToken: String
});
const User = mongoose.model('User', userSchema);

// Middleware para autenticar JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Rota para cadastro de usuário
app.post('/cadastrar', async (req, res) => {
  const { nome, email, cpf, celular, senha } = req.body;
  
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { cpf }] });
    if (existingUser) return res.status(400).json({ error: 'Usuário já cadastrado com esse email ou CPF' });

    const hashedPassword = await bcrypt.hash(senha, 12);
    const newUser = new User({ nome, email, cpf, celular, senha: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: 'Cadastro realizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar' });
  }
});

// Rota para login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) return res.status(401).json({ error: 'Credenciais inválidas' });

    const accessToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ email: user.email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Salvar o refreshToken no banco de dados
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ success: true, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
});

// Rota para refresh token
app.post('/token', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  try {
    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.status(403).json({ error: 'Refresh token inválido' });

    jwt.verify(token, JWT_REFRESH_SECRET, (err, userData) => {
      if (err) return res.status(403).json({ error: 'Refresh token expirado ou inválido' });

      const accessToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '15m' });
      res.json({ accessToken });
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar novo token' });
  }
});

// Rota protegida para testar autenticação
app.get('/usuarios', authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
// Função para armazenar o token de forma segura
const setToken = (token) => {
    document.cookie = `token=${token}; Path=/; Secure; HttpOnly`;
  };
  
  // Função para obter o token do cookie
  const getToken = () => {
    const name = "token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  
  document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    if (!email || !senha) {
      return alert('Por favor, preencha todos os campos.');
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
        setToken(data.accessToken); // Armazenando o token de forma segura
        window.location.href = 'usuarios.html';
      } else {
        alert('Credenciais inválidas.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar ao servidor.');
    }
  });
  