from flask import Blueprint, request, jsonify
from sqlalchemy import text
from models import db

# Create a Blueprint for registration
registration_bp = Blueprint("registration", __name__)

# ✅ Register a participant for a tournament
@registration_bp.route("/register_tournament", methods=["POST"])
def register_tournament():
    data = request.json
    try:
        tournament_id = data["TournamentID"]
        participant_name = data["ParticipantName"]
        email = data["Email"]

        # Use text() to avoid SQLAlchemy text expression error
        sql_query = text(
            "INSERT INTO registration (TournamentID, ParticipantName, Email) VALUES (:TournamentID, :ParticipantName, :Email)"
        )

        db.session.execute(
            sql_query,
            {"TournamentID": tournament_id, "ParticipantName": participant_name, "Email": email}
        )
        db.session.commit()

        return jsonify({"message": "✅ Registration successful!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# ✅ Get all registrations for a tournament
@registration_bp.route("/get_registrations/<int:tournament_id>", methods=["GET"])
def get_registrations(tournament_id):
    try:
        sql_query = text("SELECT * FROM registration WHERE TournamentID = :TournamentID")
        result = db.session.execute(sql_query, {"TournamentID": tournament_id})
        registrations = [dict(row) for row in result.mappings()]
        
        return jsonify(registrations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
