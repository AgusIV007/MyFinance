from . import get_db_connection
from flask import request, jsonify

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


@app.route("/addNote", methods=["POST"])
def add_event():
    data = request.get_json()  
    fecha = data.get("fecha") 
    descripcion = data.get("descripcion") 
    
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO eventos (usuario_id, fecha, descripcion)
                VALUES ((SELECT id FROM users WHERE email = 'mail1'), %s, %s)
            """, (fecha, descripcion))
        conn.commit()
        return jsonify({"message": "Evento añadido con éxito"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

def delete_event(event_id):
	conn = get_db_connection()
	try:
		with conn.cursor() as cursor:
			cursor.execute("DELETE FROM eventos WHERE id = %s AND usuario_id = (SELECT id FROM users WHERE email = 'mail1')", (event_id))
		conn.commit()
	finally:
		conn.close()
