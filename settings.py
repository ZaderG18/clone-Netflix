from pathlib import Path
import pandas as pd 
from flask import Flask, render_template, redirect, request, jsonify


app = Flask(__name__)

@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    dados = request.get_json()
    
    nome = dados.get('nome')
    email = dados.get('email')
    cpf = dados.get('cpf')
    celular  = dados.get('celular')
    senha = dados.get('senha')


    #Aqui podemos adicionar uma logica para salvar os dados em um banco de dados, etc.
    
    
    
    #retorna uma resposta de sucesso
    return jsonify(sucess=True)



if __name__ == '__main__':
    app.run(debug=True)
















#app = Flask(__name__)
#app.config['SECRET_KEY'] = 'ARTHUREOCARA'


#@app.route('/')
#def home():
#    return render_template('index.html')

#@app.route('/login', methods=['post'])
#def login():
    
#    nome = request.form.get('Email ou número de celular')
#    senha = request.form.get('Senha')
    
#    return redirect('/')




#if __name__ in '___main___':
#    app.run(debug=True)