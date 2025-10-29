from flask import Blueprint, request, jsonify
from models import db, Payment

payment_bp = Blueprint("payment_bp", __name__)

# ✅ Get All Payments
@payment_bp.route("/get_payments", methods=["GET"])
def get_payments():
    payments = Payment.query.all()
    return jsonify([
        {
            "PaymentID": payment.PaymentID,
            "StudentID": payment.StudentID,
            "Amount": float(payment.Amount),  # Ensure correct number format
            "Date": payment.Date.strftime("%Y-%m-%d"),
            "Method": payment.Method
        }
        for payment in payments
    ]), 200

# ✅ Add a New Payment
@payment_bp.route("/add_payment", methods=["POST"])
def add_payment():
    try:
        data = request.json

        # 🔹 Input Validation
        required_fields = ["StudentID", "Amount", "Date", "Method"]
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # 🔹 Ensure Amount is a valid number
        try:
            amount = float(data["Amount"])
            if amount <= 0:
                return jsonify({"error": "Amount must be a positive number"}), 400
        except ValueError:
            return jsonify({"error": "Invalid amount format"}), 400

        # 🔹 Add new payment
        new_payment = Payment(
            StudentID=data["StudentID"],
            Amount=amount,
            Date=data["Date"],  # Ensure correct date format in frontend
            Method=data["Method"]
        )
        db.session.add(new_payment)
        db.session.commit()

        return jsonify({
            "message": "Payment added successfully",
            "PaymentID": new_payment.PaymentID,
            "StudentID": new_payment.StudentID,
            "Amount": new_payment.Amount,
            "Date": new_payment.Date.strftime("%Y-%m-%d"),
            "Method": new_payment.Method
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
