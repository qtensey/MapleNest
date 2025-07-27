from . import db
from datetime import datetime

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    phone = db.Column(db.String(50))
    service = db.Column(db.String(100))
    square_ft = db.Column(db.Float)
    square_m2 = db.Column(db.Float)
    status = db.Column(db.String(10), default='open')  # open / closed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
