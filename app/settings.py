from flask import request, jsonify, render_template, redirect, url_for
from app import app, bcrypt
import jwt
import datetime

# Simulando banco de dados para usuários
users = []

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        senha = data.get('senha')

        user = next((user for user in users if user['email'] == email), None)
        if user and bcrypt.check_password_hash(user['senha'], senha):
            token = jwt.encode({'email': user['email'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, app.config['SECRET_KEY'])
            return jsonify({'success': True, 'token': token})

        return jsonify({'error': 'Credenciais inválidas'}), 401
    return render_template('login.html')

@app.route('/cadastrar', methods=['GET', 'POST'])
def cadastrar():
    if request.method == 'POST':
        data = request.get_json()
        nome = data.get('nome')
        email = data.get('email')
        cpf = data.get('cpf')
        celular = data.get('celular')
        senha = data.get('senha')

        if any(user['email'] == email for user in users):
            return jsonify({'error': 'Usuário já cadastrado'}), 400

        hashed_password = bcrypt.generate_password_hash(senha).decode('utf-8')
        users.append({'nome': nome, 'email': email, 'cpf': cpf, 'celular': celular, 'senha': hashed_password})

        return jsonify({'success': True})
    return render_template('cadastro.html')

@app.route('/usuarios')
def usuarios():
    return render_template('usuarios.html')
