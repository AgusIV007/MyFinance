from . import get_db_connection

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
            conn.commit()
            for result in cursor.stored_results():
                data = result.fetchall()
            return data
    except Exception as e:
        raise e
    finally:
        conn.close()
