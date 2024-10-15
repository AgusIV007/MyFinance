from flask import Flask, json, render_template, redirect, request, session
import datetime
import mysql.connector
import os

app = Flask(__name__)
app.secret_key = os.urandom(24).hex()  # Necesario para usar sesiones

print(app.secret_key)

EXEMPT_ROUTES = [
	'/showSignUp',
	'/showSignIn',
	'/signUp',
	'/signIn',
	'/validateLogin',
	'/test'
]

def authenticateSession():
	if 'username' in session:
		user = session["username"]
		return True
	else:
		return redirect('/showSignIn')

@app.before_request
def before_request():
	if request.path not in EXEMPT_ROUTES:
		result = authenticateSession()
		if result is not True:
			return result

@app.route("/logout")
def logout():
	session.clear()
	return redirect("/")

def get_db_connection():
	return mysql.connector.connect(
		host="192.168.50.44",
		user="g6-agustiniv",
		password="GNkYL)T[bL3OwZHK",
		database="g6-agustiniv",
		collation="utf8mb3_general_ci",
	)


@app.route('/showSignUp')
def showSignUp():
	return render_template('signup.html')

@app.route('/signUp', methods=['POST'])
def signUp():
	_name = request.form['inputName']
	_email = request.form['inputEmail']
	_password = request.form['inputPassword']
	
	if _name and _email and _password:
		try:
			create_user(_name, _password, _email)
			return json.dumps({'html': '<span>User created successfully!</span>'})
		except Exception as e:
			return json.dumps({'html': f'<span>Error: {str(e)}</span>'})
	else:
		return json.dumps({'html': '<span>Please enter the required fields</span>'})

@app.route('/showSignIn')
def showSignIn():
	return render_template('signIn.html')

@app.route('/validateLogin', methods=['POST'])
def validateLogin():
	_email = request.form['inputEmail']
	_password = request.form['inputPassword']
	
	data = validate_user_login(_email, _password)
	if data[2]:
		session['userId'] = data[3]
		session['email'] = _email
		session['username'] = data[4]
		return redirect('/')
	else:
		return render_template('error.html', error='Invalid email or password')

def validate_user_login(email, password):
	conn = get_db_connection()
	try:
		with conn.cursor() as cursor:
			data = cursor.callproc('sp_validateLogin', (email, password, 0, 0, 'hola'))
			return data
	except Exception as e:
		conn.rollback()
		raise e
	finally:
		conn.close()
 
def create_user(name, password, email):
	conn = get_db_connection()
	try:
		with conn.cursor() as cursor:
			data = cursor.callproc('sp_createUser', (name, password, email))
			return data
	except Exception as e:
		conn.rollback()
		raise e
	finally:
		conn.close()

def getNotasUsuario(userId, ano, mes):
	conn = get_db_connection()
	with conn.cursor() as cursor:
		cursor.execute("""
			SELECT id, DATE_FORMAT(fecha_nota, '%d-%m-%Y') as fecha_nota, descripcion, importe FROM nota
			WHERE user_id = %s
			AND EXTRACT(YEAR FROM fecha_nota) = '%s'
			AND EXTRACT(MONTH FROM fecha_nota) = '%s'
			;
			""", (userId, ano, mes))
		return cursor.fetchall()
	conn.close()

@app.route('/createNota', methods=['POST'])
def create_nota(user_id, fecha, descripcion, importe):
	conn = get_db_connection()
	try:
		with conn.cursor() as cursor:
			cursor.callproc('sp_createUser', (user_id, fecha, descripcion, importe))
		return 'Nota creada'
	except Exception as e:
		conn.rollback()
		raise e
	finally:
		conn.close()

@app.route("/")
def main():
	notas = getNotasUsuario(session['userId'], 2024, 10)
	return render_template('calendar/calendar.html', notas=notas)

app.run(debug=True)