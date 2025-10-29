from flask import Blueprint, request, jsonify
from models import db, Tournament, Coach
from datetime import datetime

tournament_bp = Blueprint("tournament", __name__)

# ✅ Get all tournaments
@tournament_bp.route("/get_tournaments", methods=["GET"])
def get_tournaments():
    tournaments = Tournament.query.all()
    tournament_list = [t.to_dict() for t in tournaments]
    return jsonify(tournament_list)

# ✅ Get all coaches (for dropdown in frontend)
@tournament_bp.route("/get_coaches", methods=["GET"])
def get_coaches():
    coaches = Coach.query.all()
    coach_list = [{"CoachID": c.CoachID, "Name": c.Name} for c in coaches]
    return jsonify(coach_list)

# ✅ Add a new tournament
@tournament_bp.route("/add_tournament", methods=["POST"])
def add_tournament():
    data = request.json
    try:
        # Convert date string to datetime.date object
        tournament_date = datetime.strptime(data["Date"], "%Y-%m-%d").date() if data["Date"] else None

        # Create new tournament
        new_tournament = Tournament(
            Name=data["Name"],
            Date=tournament_date,
            Location=data["Location"],
            CoachID=int(data["CoachID"]) if data["CoachID"] else None,
            CourtID=int(data["CourtID"]) if "CourtID" in data and data["CourtID"] else None,
            Status="Upcoming",
            Winner=None
        )

        db.session.add(new_tournament)
        db.session.commit()

        return jsonify({"message": "Tournament added successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
