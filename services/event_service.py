from . import get_db_connection

def get_user_events(email):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, fecha, descripcion FROM eventos WHERE usuario_id = (SELECT id FROM users WHERE email = %s)", (email,))
            eventos = cursor.fetchall()
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
