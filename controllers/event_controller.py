from flask import Blueprint, render_template, request, session, redirect
from services.event_service import get_user_events, add_event, delete_event

event_controller = Blueprint('event_controller', __name__)

@event_controller.route('/calendar')
def calendar():
    if 'user' not in session:
        return redirect('/signin')
    
    eventos = get_user_events(session['user'])
    return render_template('calendar.html', eventos=eventos)

@event_controller.route('/addEvent', methods=['POST'])
def add_event_route():
    if 'user' not in session:
        return redirect('/signin')

    fecha = request.form['fecha']
    descripcion = request.form['descripcion']
    
    add_event(session['user'], fecha, descripcion)
    return redirect('/calendar')

@event_controller.route('/deleteEvent/<int:event_id>')
def delete_event_route(event_id):
    if 'user' not in session:
        return redirect('/signin')

    delete_event(event_id, session['user'])
    return redirect('/calendar')
