from flask import Blueprint, render_template, request, session, redirect, json
from services.user_service import create_user, validate_user_login, get_suma_test
import os

auth_controller = Blueprint('auth_controller', __name__)

def log(*args, **kwargs):
	return print(*args, flush=True, **kwargs)

@auth_controller.route('/test')
def test():
	r = get_suma_test()
	return f"hola {r}"

def authenticateSession():
	print(session)
	if 'username' in session:
		user = session["username"]
		return True
	else:
		return redirect('/signin')


@auth_controller.route('/showSignUp')
def showSignUp():
	return render_template('signup.html')

@auth_controller.route('/signUp', methods=['POST'])
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

@auth_controller.route('/signin')
def showSignin():
	return render_template('signin.html')

@auth_controller.route('/api/validateLogin', methods=['POST'])
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
