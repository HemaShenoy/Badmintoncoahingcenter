from flask import Blueprint, request, jsonify
from models import db, Coach  # ✅ Import Coach model

auth_bp = Blueprint("auth", __name__)

# ✅ Coach Login Route
@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")  # Coach name as username
    password = data.get("password")

    # Check in the coach table
    coach = Coach.query.filter_by(Name=username, password=password).first()

    if coach:
        return jsonify({
            "message": "Login successful",
            "userType": "coach",
            "username": coach.Name
        }), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
