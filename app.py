from flask import Flask, render_template, request
from controllers.auth_controller import auth_controller, authenticateSession
from controllers.notaController import notaController
import os
#https://code.tutsplus.com/creating-a-web-app-from-scratch-using-python-flask-and-mysql-part-2--cms-22999t
from django.db import router
from flask import Flask, render_template, json, request, session, redirect
import mysql.connector

app = Flask(__name__)
app.secret_key = os.urandom(24).hex()  # Necesario para usar sesiones

print(app.secret_key)

app.register_blueprint(auth_controller)
app.register_blueprint(notaController)

EXEMPT_ROUTES = [
	'/showSignUp',
	'/signUp',
	'/signin',
	'/api/validateLogin',
	'/test'
]

@app.before_request
def before_request():
	if request.path not in EXEMPT_ROUTES:
		result = authenticateSession()
		if result is not True:
			return result

@app.route("/")
def main():
	return render_template('index.html')

if __name__ == "__main__":
	app.run()

@app.route('/nose', methods=['POST'])
async def usuario(request):
    return json({
        'usuario': "usuarios",
    })
    