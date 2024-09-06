from flask import Flask
from flask_bcrypt import Bcrypt
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'supersecretkey')

bcrypt = Bcrypt(app)

from app import settings
