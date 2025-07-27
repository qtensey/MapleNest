from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    if os.environ.get("FLY_APP_NAME"):
        # Запуск на Fly — используем volume /data
        db_path = "/data/site.db"
    else:
        # Локально — база в корне пакета
        basedir = os.path.abspath(os.path.dirname(__file__))
        db_path = os.path.join(basedir, "site.db")

    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
    app.config['SECRET_KEY'] = 'секрет'

    db.init_app(app)

    from .routes import main
    app.register_blueprint(main)

    with app.app_context():
        from .models import Order
        db.create_all()

    return app