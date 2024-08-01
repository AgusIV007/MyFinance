from flask import Flask, render_template, json, request
import mysql.connector

app = Flask(__name__)
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
                cursor.callproc('finance_createUser', (_name, _email, _password))
            conn.commit()
            return json.dumps({'html': '<span>All fields good !!</span>'})
        except mysql.connector.Error as err:
            conn.rollback()
            return json.dumps({'html': f'<span>Error: {err}</span>'})
    else:
        return json.dumps({'html': '<span>Enter the required fields</span>'})


if __name__ == "__main__":
    app.run()