#https://code.tutsplus.com/creating-a-web-app-from-scratch-using-python-flask-and-mysql-part-2--cms-22999t
from flask import Flask, render_template, json, request, session, redirect
import mysql.connector
from werkzeug.security import check_password_hash

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Necesario para usar sesiones

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="i2i0L2aH1",
    database="mydb"
)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/hola")
def hola():
    return render_template('hola/hola.html')

@app.route('/showSignUp')
def showSignUp():
    return render_template('signup.html')

@app.route('/signUp',methods=['POST'])
def signUp():
    _name = request.form['inputName']
    _email = request.form['inputEmail']
    _password = request.form['inputPassword']
    # validate the received values 
    if _name and _email and _password:
        try:
            with conn.cursor() as cursor:
                cursor.callproc('sp_createUser', (_name, _password, _email))
            conn.commit()
            return json.dumps({'html': '<span>All fields good !!</span>'})
        except mysql.connector.Error as err:
            conn.rollback()
            return json.dumps({'html': f'<span>Error: {err}</span>'})
    else:
        return json.dumps({'html': '<span>Enter the required fields</span>'})

@app.route('/signin')
def showSignin():
    return render_template('signin.html')

@app.route('/api/validateLogin',methods=['POST'])
def validateLogin():
    try:
        _username = request.form['inputEmail']
        _password = request.form['inputPassword']
        # Use the existing connection
        con = conn
        cursor = con.cursor()
        cursor.callproc('sp_validateLogin', (_username,))
        data = cursor.fetchall()
        if len(data) > 0:
            # Assuming the hashed password is in the fourth column (index 3)
            if check_password_hash(str(data[0][3]), _password):
                session['user'] = data[0][0]
                return redirect('/userHome')
            else:
                return render_template('error.html', error='Wrong Email address or Password')
        else:
            return render_template('error.html', error='Wrong Email address or Password')
    except Exception as e:
        return render_template('error.html', error=str(e))
    finally:
        cursor.close()
        con.close()

@app.route('/userHome')
def userHome():
    return render_template('userhome.html')

if __name__ == "__main__":
    app.run()
