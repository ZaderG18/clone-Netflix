from flask import Flask, render_template, request, jsonify
from flask_bcrypt import Bcrypt
import jwt
import datetime

app = Flask(__name__)
app.secret_key = '1234'  # Chave secreta para o Flask e JWT
bcrypt = Bcrypt(app)

# Simulação de um banco de dados para usuários (apenas em memória)
users = []

# Rota principal que renderiza a página de login
@app.route('/')
def index():
    return render_template('index.html')

# Rota para processar o login
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    senha = request.json['senha']
    
    user = next((user for user in users if user['email'] == email), None)
    if user and bcrypt.check_password_hash(user['senha'], senha):
        # Gerar um token JWT
        token = jwt.encode(
            {'email': user['email'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            app.secret_key, 
            algorithm='HS256'
        )
        return jsonify({'success': True, 'token': token})
    else:
        return jsonify({'success': False, 'message': 'Credenciais inválidas'}), 401

# Rota para processar o cadastro
@app.route('/cadastro', methods=['GET', 'POST'])
def cadastrar():
    if request.method == 'POST':
        data = request.json
        nome = data['nome']
        email = data['email']
        cpf = data['cpf']
        celular = data['celular']
        senha = data['senha']
        
        if any(user['email'] == email for user in users):
            return jsonify({'success': False, 'message': 'Usuário já cadastrado'}), 400
        
        hashed_senha = bcrypt.generate_password_hash(senha).decode('utf-8')
        users.append({
            'nome': nome,
            'email': email,
            'cpf': cpf,
            'celular': celular,
            'senha': hashed_senha
        })
        return jsonify({'success': True})
    
    return render_template('cadastro.html')

# Rota para o dashboard (página pós-login)
@app.route('/usuarios')
def dashboard():
    return 'Bem-vindo ao Dashboard!'

if __name__ == '__main__':
    app.run(debug=True, port=8000)
