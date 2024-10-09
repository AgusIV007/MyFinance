from . import get_db_connection

def get_suma_test():
	conn = get_db_connection()
	try:

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
	a,a = '',''
	try:
		with conn.cursor() as cursor:
			cursor.callproc('sp_validateLogin', (email, password, a, a))
			for result in cursor.stored_results():
				data = result.fetchall()
		return data
	except Exception as e:
		raise e
	finally:
		conn.close()

def validate_user_loginnnn(email, password):
	print(email)
	print(password)
	user_exists, user_id = False, 0
	conn = get_db_connection()
	with conn.cursor() as cursor:
		cursor.callproc('sp_validateLogin', (email, password, user_exists, user_id))
		for result in cursor.stored_results():
			datos = result.fetchall()
	conn.close()
	print(datos)
	user_exists = datos[0]
	user_id = datos[1]
	print(user_exists)
	print(user_id)
	return user_exists, user_id