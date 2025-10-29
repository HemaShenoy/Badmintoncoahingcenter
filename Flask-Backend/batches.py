from flask import Blueprint, jsonify
from models import db, Student, Enrollment, Batch

batches_bp = Blueprint("batches", __name__)

@batches_bp.route("/batches/<int:batch_id>/students", methods=["GET"])
def get_students_by_batch(batch_id):
    students = (
        db.session.query(Student.StudentID, Student.Name, Student.Age, Batch.BatchName)
        .join(Enrollment, Student.StudentID == Enrollment.StudentID)
        .join(Batch, Enrollment.BatchID == Batch.BatchID)
        .filter(Batch.BatchID == batch_id)
        .all()
    )

    if not students:
        return jsonify({"message": "No students enrolled in this batch."}), 404

    student_list = [
        {"StudentID": student.StudentID, "Name": student.Name, "Age": student.Age, "BatchName": student.BatchName}
        for student in students
    ]

    return jsonify(student_list)
