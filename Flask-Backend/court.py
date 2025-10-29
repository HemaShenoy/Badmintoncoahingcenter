from flask import Blueprint, jsonify, request
from models import db, Court, Tournament

courts_bp = Blueprint("courts_bp", __name__)

# 🏸 **1️⃣ Get All Courts**
@courts_bp.route("/get_courts", methods=["GET"])
def get_courts():
    try:
        courts_list = Court.query.all()
        return jsonify([court.to_dict() for court in courts_list]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 🏸 **2️⃣ Add a New Court**
@courts_bp.route("/add_court", methods=["POST"])
def add_court():
    try:
        data = request.get_json()
        if not data or "CourtName" not in data or "Type" not in data:
            return jsonify({"error": "Missing required fields"}), 400

        # Check if court already exists
        existing_court = Court.query.filter_by(CourtName=data["CourtName"]).first()
        if existing_court:
            return jsonify({"error": "Court with this name already exists"}), 400

        new_court = Court(
            CourtName=data["CourtName"],
            Location=data.get("Location"),
            Type=data["Type"]
        )

        db.session.add(new_court)
        db.session.commit()
        return jsonify({"message": "Court added successfully!", "court": new_court.to_dict()}), 201

    except Exception as e:
        db.session.rollback()  # Rollback if error occurs
        return jsonify({"error": str(e)}), 500


# 🏆 **3️⃣ Get Completed Tournaments for a Court**
@courts_bp.route('/completed_tournaments/<court_name>', methods=['GET'])
def get_completed_tournaments(court_name):
    try:
        tournaments = (
            db.session.query(Tournament.Name, Court.CourtName)
            .join(Court, Tournament.CourtID == Court.CourtID)
            .filter(Tournament.Status == "Completed", Court.CourtName == court_name)
            .all()
        )

        if not tournaments:
            return jsonify({"message": "No completed tournaments found for this court"}), 404

        return jsonify([{"TournamentName": t[0], "CourtName": t[1]} for t in tournaments]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
