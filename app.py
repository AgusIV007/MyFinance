#https://code.tutsplus.com/creating-a-web-app-from-scratch-using-python-flask-and-mysql-part-2--cms-22999t
from flask import Flask, render_template, json, request, session, redirect
import mysql.connector

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Necesario para usar sesiones

def get_db_connection():
    return mysql.connector.connect(
        host="192.168.50.44",
        user="g6-agustiniv",
        password="R)WkdV.Jxfbt--6c",
        database="g6-agustiniv"
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
        conn = get_db_connection()
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
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        _email = request.form['inputEmail']
        _password = request.form['inputPassword']
        # Use the existing connection
        print("Email: " + _email +"\nPass: " + _password)
        cursor.callproc('sp_validateLogin', (_email, _password))
        conn.commit()

        for result in cursor.stored_results():
            data = result.fetchall()

        if len(data) > 0:
            if (str(data[0][0]) == '1'):
                session['user'] = _email
                return redirect('/userHome')
            else:
                return render_template('error.html', error='Wrong Email address or Password')
        else:
            return render_template('error.html', error='Wrong Email address or Password')
    except Exception as e:
        return render_template('error.html', error=str(e))
    finally:
        cursor.close()
        conn.close()

@app.route('/userHome')
def userHome():
    return render_template('userhome.html')

@app.route('/calendar')
def calendar():
    if 'user' not in session:
        return redirect('/signin')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, fecha, descripcion FROM eventos WHERE usuario_id = (SELECT id FROM users WHERE email = %s)", (session['user'],))
    eventos = cursor.fetchall()
    conn.close()
    return render_template('calendar.html', eventos=eventos)

@app.route('/addEvent', methods=['POST'])
def addEvent():
    if 'user' not in session:
        return redirect('/signin')

    fecha = request.form['fecha']
    descripcion = request.form['descripcion']
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO eventos (usuario_id, fecha, descripcion) VALUES ((SELECT id FROM users WHERE email = %s), %s, %s)", (session['user'], fecha, descripcion))
    conn.commit()
    conn.close()
    return redirect('/calendar')

@app.route('/deleteEvent/<int:event_id>')
def deleteEvent(event_id):
    if 'user' not in session:
        return redirect('/signin')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM eventos WHERE id = %s AND usuario_id = (SELECT id FROM users WHERE email = %s)", (event_id, session['user']))
    conn.commit()
    conn.close()
    return redirect('/calendar')


if __name__ == "__main__":
    app.run()
