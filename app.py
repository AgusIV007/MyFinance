from flask import Flask, render_template
from controllers.auth_controller import auth_controller
from controllers.notaController import notaController
import os

app = Flask(__name__)
app.secret_key = os.urandom(24).hex()  # Necesario para usar sesiones

print(app.secret_key)

app.register_blueprint(auth_controller)
app.register_blueprint(notaController)

@app.route("/")
def main():
	return render_template('index.html')

if __name__ == "__main__":
	app.run()