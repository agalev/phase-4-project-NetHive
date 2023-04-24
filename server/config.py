import os
from dotenv import load_dotenv
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from sqlalchemy import MetaData
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_socketio import SocketIO, emit

load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)
app.secret_key = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


UPLOAD_FOLDER = 'static/images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


metadata = MetaData(naming_convention={
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
})


db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)

db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)

socketio = SocketIO(app)

CORS(app)
