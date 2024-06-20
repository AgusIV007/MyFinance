from flask import Blueprint, jsonify
from app.services.example_service import ExampleService

example_bp = Blueprint('example_bp', __name__)
example_service = ExampleService()

@example_bp.route('/example', methods=['GET'])
def get_example():
    data = example_service.get_data()
    return jsonify(data)