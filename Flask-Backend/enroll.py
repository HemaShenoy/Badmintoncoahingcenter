from flask import Blueprint, jsonify, request
from models import db, Enrollment, Student, Batch
from datetime import datetime

enroll_bp = Blueprint("enroll", __name__)

# ✅ Get all batches for selection
@enroll_bp.route("/batches", methods=["GET"])
def get_batches():
    batches = Batch.query.all()
    return jsonify([batch.to_dict() for batch in batches])

# ✅ Enroll a new student in a batch
@enroll_bp.route("/enroll", methods=["POST"])
def enroll_student():
    data = request.json
    student_name = data.get("Name")
    batch_id = data.get("BatchID")

    if not student_name or not batch_id:
        return jsonify({"error": "Missing student name or batch ID"}), 400

    try:
        # ✅ Check if the batch exists
        batch = Batch.query.get(batch_id)
        if not batch:
            return jsonify({"error": "Batch not found"}), 404

        # ✅ Check if student already exists
        existing_student = Student.query.filter_by(Name=student_name).first()
        if existing_student:
            student_id = existing_student.StudentID
        else:
            # ✅ Create a new student
            new_student = Student(Name=student_name, Age=18, Password="default123")
            db.session.add(new_student)
            db.session.commit()
            student_id = new_student.StudentID

        # ✅ Check if the student is already enrolled in the batch
        existing_enrollment = Enrollment.query.filter_by(StudentID=student_id, BatchID=batch_id).first()
        if existing_enrollment:
            return jsonify({"message": "Student is already enrolled in this batch."}), 200

        # ✅ Enroll student
        new_enrollment = Enrollment(
            StudentID=student_id,
            BatchID=batch_id,
            EnrollmentDate=datetime.today().date()
        )
        db.session.add(new_enrollment)
        db.session.commit()

        return jsonify({"message": f"Enrollment successful! Student ID: {student_id}"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
