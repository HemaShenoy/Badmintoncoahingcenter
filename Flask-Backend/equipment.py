from flask import Blueprint, request, jsonify
from models import db, Equipment

equipment_bp = Blueprint("equipment_bp", __name__)

# ✅ GET Equipment List
@equipment_bp.route("/get_equipment", methods=["GET"])
def get_equipment():
    equipment_list = Equipment.query.all()
    return jsonify([
        {
            "EquipmentID": item.EquipmentID,
            "Name": item.Name,
            "Quantity": item.Quantity,
            "Condition": item.Condition
        }
        for item in equipment_list
    ])

# ✅ ADD Equipment
@equipment_bp.route("/add_equipment", methods=["POST"])
def add_equipment():
    try:
        data = request.get_json()
        
        # ✅ Check if all required fields are present
        if not data.get("Name") or not data.get("Quantity") or not data.get("Condition"):
            return jsonify({"error": "All fields (Name, Quantity, Condition) are required!"}), 400

        # ✅ Create new equipment entry
        new_equipment = Equipment(
            Name=data["Name"],
            Quantity=data["Quantity"],
            Condition=data["Condition"]
        )

        db.session.add(new_equipment)
        db.session.commit()

        return jsonify({"message": "Equipment added successfully!"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error adding equipment: {str(e)}"}), 500
