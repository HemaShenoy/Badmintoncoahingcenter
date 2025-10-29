from flask import Blueprint, request, jsonify
from models import db, Coach  # Assuming Coach is a SQLAlchemy model

coach_bp = Blueprint("coach_bp", __name__)

# Get all coaches
@coach_bp.route("/get_coaches", methods=["GET"])
def get_coaches():
    coaches = Coach.query.all()
    coach_list = [
        {
            "CoachID": coach.CoachID,
            "Name": coach.Name,
            "Specialization": coach.Specialization,
            "ExperienceYears": coach.ExperienceYears,
        }
        for coach in coaches
    ]
    return jsonify(coach_list)

# Add a new coach
@coach_bp.route("/add_coach", methods=["POST"])
def add_coach():
    data = request.json
    new_coach = Coach(
        CoachID=data["CoachID"],
        Name=data["Name"],
        Specialization=data["Specialization"],
        ExperienceYears=data["ExperienceYears"],
    )
    db.session.add(new_coach)
    db.session.commit()
    return jsonify({"message": "Coach added successfully"}), 201

# Delete a coach
@coach_bp.route("/delete_coach/<int:coach_id>", methods=["DELETE"])
def delete_coach(coach_id):
    coach = Coach.query.get(coach_id)
    if not coach:
        return jsonify({"error": "Coach not found"}), 404
    db.session.delete(coach)
    db.session.commit()
    return jsonify({"message": "Coach deleted successfully"}), 200
