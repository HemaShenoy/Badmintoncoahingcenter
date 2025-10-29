from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Student(db.Model):
    __tablename__ = "student"
    StudentID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(100), nullable=False)
    Age = db.Column(db.Integer, nullable=False)
    Password = db.Column(db.String(50), nullable=False)

    enrollments = db.relationship("Enrollment", backref="student", lazy=True, cascade="all, delete-orphan")
    payments = db.relationship("Payment", backref="student", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "StudentID": self.StudentID,
            "Name": self.Name,
            "Age": self.Age,
            
        }

    def __repr__(self):
        return f"<Student {self.StudentID}: {self.Name}>"



# ✅ Coach Model
class Coach(db.Model):
    __tablename__ = "coach"
    CoachID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(100), nullable=False)  # ✅ Removed unique constraint
    Specialization = db.Column(db.String(255), nullable=False)
    ExperienceYears = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(50), nullable=False)  # ✅ Changed to lowercase 'password'

    tournaments = db.relationship("Tournament", backref="coach", lazy=True, cascade="all, delete-orphan")
    batches = db.relationship("Batch", backref="coach", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "CoachID": self.CoachID,
            "Name": self.Name,
            "Specialization": self.Specialization,
            "ExperienceYears": self.ExperienceYears,
            "password": self.password,
        }

    def __repr__(self):
        return f"<Coach {self.CoachID}: {self.Name}>"



class Court(db.Model):
    __tablename__ = "court"
    CourtID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CourtName = db.Column(db.String(100), nullable=False)
    Location = db.Column(db.String(100), nullable=True)  # ✅ Made nullable
    Type = db.Column(db.String(50), nullable=True)  # ✅ Made nullable

    tournaments = db.relationship("Tournament", backref="court", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "CourtID": self.CourtID,
            "CourtName": self.CourtName,
            "Location": self.Location,
            "Type": self.Type,
        }

    def __repr__(self):
        return f"<Court {self.CourtID}: {self.CourtName}>"





class Tournament(db.Model):
    __tablename__ = "tournament"
    TournamentID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(255), nullable=False)
    Date = db.Column(db.Date, nullable=True)  # ✅ Date can be NULL
    Location = db.Column(db.String(255), nullable=True)  # ✅ Location can be NULL
    CoachID = db.Column(db.Integer, db.ForeignKey("coach.CoachID"), nullable=True)
    CourtID = db.Column(db.Integer, db.ForeignKey("court.CourtID"), nullable=True)  # ✅ CourtID can be NULL
    Status = db.Column(db.String(50), nullable=False, default="Upcoming")  # ✅ Default: Upcoming
    Winner = db.Column(db.String(255), nullable=True)  # ✅ Can be NULL

    # Relationship with registrations
    registrations = db.relationship("Registration", backref="tournament", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        """Return tournament details as a dictionary."""
        return {
            "TournamentID": self.TournamentID,
            "Name": self.Name,
            "Date": str(self.Date) if self.Date else None,
            "Location": self.Location,
            "CoachID": self.CoachID,
            "CourtID": self.CourtID,
            "Status": self.Status,
            "Winner": self.Winner,
        }

    def __repr__(self):
        return f"<Tournament {self.TournamentID}: {self.Name}>"




# ✅ Batch Model
class Batch(db.Model):
    __tablename__ = "batch"
    BatchID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    BatchName = db.Column(db.String(100), nullable=False)
    Timings = db.Column(db.String(50), nullable=False)
    CoachID = db.Column(db.Integer, db.ForeignKey("coach.CoachID"), nullable=False)

    # ✅ Add relationship to Enrollment
    enrollments = db.relationship(
        "Enrollment",
        backref="batch",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "BatchID": self.BatchID,
            "BatchName": self.BatchName,
            "Timings": self.Timings,
            "CoachID": self.CoachID,
        }
    
# ✅ Registration Model (NEW)
class Registration(db.Model):
    __tablename__ = "registration"
    RegistrationID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    TournamentID = db.Column(db.Integer, db.ForeignKey("tournament.TournamentID", ondelete="CASCADE"), nullable=False)
    ParticipantName = db.Column(db.String(255), nullable=False)
    Email = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "RegistrationID": self.RegistrationID,
            "TournamentID": self.TournamentID,
            "ParticipantName": self.ParticipantName,
            "Email": self.Email,
        }

    def __repr__(self):
        return f"<Registration {self.RegistrationID}: {self.ParticipantName}>"



# ✅ Enrollment Model
class Enrollment(db.Model):
    __tablename__ = "enrollment"
    EnrollmentID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    StudentID = db.Column(db.Integer, db.ForeignKey("student.StudentID"), nullable=False)
    BatchID = db.Column(db.Integer, db.ForeignKey("batch.BatchID"), nullable=False)
    EnrollmentDate = db.Column(db.Date, nullable=False)

# ✅ Equipment Model
class Equipment(db.Model):
    __tablename__ = "equipment"
    EquipmentID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(255), nullable=False)
    Quantity = db.Column(db.Integer, nullable=False)
    Condition = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f"<Equipment {self.EquipmentID}: {self.Name}>"





# ✅ Payment Model
class Payment(db.Model):
    __tablename__ = "payment"
    PaymentID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    StudentID = db.Column(db.Integer, db.ForeignKey("student.StudentID"), nullable=False)
    Amount = db.Column(db.Float, nullable=False)
    Date = db.Column(db.Date, nullable=False)
    Method = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "PaymentID": self.PaymentID,
            "StudentID": self.StudentID,
            "Amount": self.Amount,
            "Date": str(self.Date),
            "Method": self.Method,
        }

    def __repr__(self):
        return f"<Payment {self.PaymentID}: {self.Amount}>"
