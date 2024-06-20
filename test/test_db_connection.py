from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

def test_db_connection():
    try:
        db.session.execute('SELECT 1')  # Ejecuta una consulta simple para probar la conexión
        print("Connection to database successful!")
    except Exception as e:
        print(f"Connection to database failed: {str(e)}")

if __name__ == '__main__':
    test_db_connection()