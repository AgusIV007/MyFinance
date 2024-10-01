from . import get_db_connection

def getNotas(idUsuario):
	conn = get_db_connection()
	idUsuario = int(idUsuario)
	try:
		with conn.cursor() as cursor:
			cursor.execute("SELECT * FROM nota WHERE idUsuario = (SELECT id FROM usuarios WHERE idusuarios = %(idUsuario)s)", {idUsuario: idUsuario})
			eventos = cursor.fetchall()
		print(eventos)
		return eventos
	finally:
		conn.close()

def add_event(email, fecha, descripcion):
	conn = get_db_connection()
	try:
		with conn.cursor() as cursor:
			cursor.execute("INSERT INTO eventos (usuario_id, fecha, descripcion) VALUES ((SELECT id FROM users WHERE email = %s), %s, %s)", (email, fecha, descripcion))
		conn.commit()
	finally:
		conn.close()

def delete_event(event_id, email):
	conn = get_db_connection()
	try:
		with conn.cursor() as cursor:
			cursor.execute("DELETE FROM eventos WHERE id = %s AND usuario_id = (SELECT id FROM users WHERE email = %s)", (event_id, email))
		conn.commit()
	finally:
		conn.close()
