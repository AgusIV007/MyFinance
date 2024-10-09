import mysql.connector

def get_db_connection():
	return mysql.connector.connect(
		host="192.168.50.44",
		user="g6-agustiniv",
		password="GNkYL)T[bL3OwZHK",
		database="g6-agustiniv",
  		collation="utf8mb3_general_ci",
	)