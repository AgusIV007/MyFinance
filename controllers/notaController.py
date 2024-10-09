from flask import Blueprint, render_template, request, session, redirect
from services.notaService import *

notaController = Blueprint('notaController', __name__)

@notaController.route('/calendar')
def calendar():
	print(session)
	if 'user' not in session:
		return redirect('/signin')
	
	notas = getNotas(session['userId'])
	return render_template('calendar.html', notas=notas)

@notaController.route('/addEvent', methods=['POST'])
def add_event_route():
	if 'user' not in session:
		return redirect('/signin')

	fecha = request.form['fecha']
	descripcion = request.form['descripcion']
	
	add_event(session['user'], fecha, descripcion)
	return redirect('/calendar')

@notaController.route('/deleteEvent/<int:event_id>')
def delete_event_route(event_id):
	if 'user' not in session:
		return redirect('/signin')

	delete_event(event_id, session['user'])
	return redirect('/calendar')
