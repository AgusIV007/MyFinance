from flask import Blueprint, render_template, request, session, redirect, json
from services.user_service import create_user, validate_user_login, get_suma_test

auth_controller = Blueprint('auth_controller', __name__)

@auth_controller.route('/test')
def test():
	r = get_suma_test()
	return f"hola {r}"


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
	if len(data) > 0 and str(data[0][0]) == '1':
		session['user'] = _email
		session['userId'] = data[0][1]
		return redirect('/userHome')
	else:
		return render_template('error.html', error='Invalid email or password')
