from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta'

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    senha = request.form['senha']
    
    # Aqui você faz a verificação do login
    if email == 'usuario@exemplo.com' and senha == 'senha123':
        return redirect(url_for('dashboard'))
    else:
        flash('Credenciais inválidas', 'error')
        return redirect(url_for('index'))

@app.route('/cadastrar')
def cadastrar():
    return render_template('cadastro.html')

@app.route('/dashboard')
def dashboard():
    return 'Bem-vindo ao Dashboard!'

if __name__ == '__main__':
    app.run(debug=True)
