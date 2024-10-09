from django.db import router
from flask import Flask, render_template, request
from controllers.auth_controller import auth_controller, authenticateSession
from controllers.notaController import notaController
import os

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
	return render_template('calendar.html')

@app.route('/nose', methods=['POST'])
async def usuario(request):
    return json({
        'usuario': "usuarios",
    })

if __name__ == "__main__":
	app.run()