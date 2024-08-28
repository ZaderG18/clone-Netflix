from pathlib import Path
import pandas as pd 
from flask import Flask, render_template, redirect, request

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ARTHUREOCARA'


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['post'])
def login():
    
    nome = request.form.get('Email ou número de celular')
    senha = request.form.get('Senha')
    
    return redirect('/')




if __name__ in '___main___':
    app.run(debug=True)