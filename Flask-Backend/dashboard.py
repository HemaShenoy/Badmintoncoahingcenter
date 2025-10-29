from flask import Blueprint, jsonify, request
from models import db, Enrollment, Batch

dashboard_bp = Blueprint("dashboard", __name__)

# ✅ Get all enrollments
@dashboard_bp.route('/coach/enrollments', methods=['GET'])
def get_enrollments():
    enrollments = Enrollment.query.all()
    return jsonify([enrollment.to_dict() for enrollment in enrollments])
@dashboard_bp.route('/coach/enrollments', methods=['POST'])
def add_enrollment():
    data = request.json
    try:
        new_enrollment = Enrollment(
            StudentID=data['StudentID'],
            BatchID=data['BatchID'],
            EnrollmentDate=data['EnrollmentDate']
        )
        db.session.add(new_enrollment)
        db.session.commit()
        
        return jsonify({
            "message": "Enrollment added successfully!",
            "EnrollmentID": new_enrollment.EnrollmentID  # ✅ Return the generated ID
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    
# ✅ Get all batches
@dashboard_bp.route('/coach/batches', methods=['GET'])
def get_batches():
    batches = Batch.query.all()
    return jsonify([batch.to_dict() for batch in batches])

# ✅ Add a new batch (Fixed field names)
@dashboard_bp.route('/coach/batches', methods=['POST'])
def add_batch():
    data = request.json
    try:
        new_batch = Batch(
            BatchName=data['BatchName'],  # ✅ Fixed field names
            Timings=data['Timings'],
            CoachID=data['CoachID']
        )
        db.session.add(new_batch)
        db.session.commit()
        return jsonify({"message": "Batch added successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
