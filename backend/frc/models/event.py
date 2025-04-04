from datetime import datetime
from frc.extensions import db


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.Date, nullable=True)
    day = db.Column(db.String(20), nullable=True)
    time = db.Column(db.String(20), nullable=True)
    location = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date.strftime("%Y-%m-%d") if self.date else None,
            "day": self.day,
            "time": self.time,
            "location": self.location,
        }
