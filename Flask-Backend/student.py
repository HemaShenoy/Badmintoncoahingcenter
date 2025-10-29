from flask import Blueprint, jsonify, request
from models import db, Student

# ✅ Define Blueprint
student_bp = Blueprint("student", __name__)

# ✅ 1️⃣ GET: Fetch All Students
@student_bp.route("/get_students", methods=["GET"])
def get_students():
    students = Student.query.all()
    student_list = [{"StudentID": s.StudentID, "Name": s.Name, "Age": s.Age} for s in students]  # ✅ Excluding password
    return jsonify({"status": "success", "students": student_list}), 200

# ✅ 2️⃣ POST: Add New Student
@student_bp.route("/add_student", methods=["POST"])
def add_student():
    data = request.json

    # 🚀 Validation: Ensure required fields are present
    if not data or "Name" not in data or "Age" not in data or "Password" not in data:
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    try:
        new_student = Student(
            Name=data["Name"].strip(),
            Age=int(data["Age"]),
            Password=data["Password"].strip()  # ✅ Storing password
        )
        db.session.add(new_student)
        db.session.commit()
        return jsonify({"status": "success", "message": "Student added!", "StudentID": new_student.StudentID}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": f"Failed to add student: {str(e)}"}), 500

# ✅ 3️⃣ DELETE: Remove a Student
@student_bp.route("/delete_student/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):
    student = Student.query.get_or_404(student_id, description="Student not found")

    db.session.delete(student)
    db.session.commit()

    return jsonify({"status": "success", "message": "Student deleted!"}), 200
