from flask import Flask
from flask_cors import CORS
from models import db
from student import student_bp
from coach import coach_bp
from tournament import tournament_bp
from equipment import equipment_bp
from court import courts_bp
from payment import payment_bp
from dashboard import dashboard_bp
from batches import batches_bp
from enroll import enroll_bp
from auth import auth_bp  # ✅ Import login blueprint
from registration import registration_bp

app = Flask(__name__)
CORS(app)

# ✅ Database Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:2005@localhost/badminton_coaching_center"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# ✅ Register Blueprints
app.register_blueprint(student_bp)
app.register_blueprint(coach_bp)
app.register_blueprint(tournament_bp)
app.register_blueprint(equipment_bp)
app.register_blueprint(courts_bp)
app.register_blueprint(payment_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(batches_bp)
app.register_blueprint(enroll_bp)
app.register_blueprint(auth_bp)  # ✅ Register login blueprint
app.register_blueprint(registration_bp)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
