import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="192.168.50.44",
        user="g6-agustiniv",
        password="R)WkdV.Jxfbt--6c",
        database="g6-agustiniv"
    )