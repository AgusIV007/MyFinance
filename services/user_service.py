from . import get_db_connection

def get_suma_test():
	conn = get_db_connection()
	try:
		# with conn.cursor() as cursor:
		# 	cursor.execute("SELECT 2+2")
		# 	res = cursor.fetchall()

		with conn.cursor() as cursor:
			cursor.callproc('testsuma')
     
			for result in cursor.stored_results():
				data = result.fetchall()
				return data
		raise ValueError("COMO QUE NO HUBO RESULTADOS AAAAAAA")

	finally:
		conn.close()

def create_user(name, password, email):
	conn = get_db_connection()
	try:
		with conn.cursor() as cursor:
			cursor.callproc('sp_createUser', (name, password, email))
		conn.commit()
	except Exception as e:
		conn.rollback()
		raise e
	finally:
		conn.close()

def validate_user_login(email, password):
	conn = get_db_connection()
	try:
		with conn.cursor() as cursor:
			cursor.callproc('sp_validateLogin', (email, password))
			for result in cursor.stored_results():
				data = result.fetchall()
		return data
	except Exception as e:
		raise e
	finally:
		conn.close()
