from functools import wraps
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required
from frc.models.user import User
from frc.models.event import Event
from frc.extensions import db

# Create blueprint
api_bp = Blueprint("api", __name__)

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        jwt_data = get_jwt()
        if not jwt_data.get('is_admin', False):
            return jsonify({"error": "Admin privileges required"}), 403
        return fn(*args, **kwargs)
    return wrapper
        

@api_bp.route("/events", methods=["GET"])
def get_events():
    query = db.session.query(Event)
    events = query.all()
    return jsonify([e.to_dict() for e in events])


@api_bp.route("/events", methods=["POST"])
@jwt_required()
@admin_required
def create_event():
    data = request.json
    event = Event(
        title=data.get("title"),
        description=data.get("description"),
        date=data.get("date"),
        day=data.get("day"),
        time=data.get("time"),
        location=data.get("location"),
    )
    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_dict()), 201

@api_bp.route('/events/<int:event_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_event(event_id):
    event = Event.query.get_or_404(event_id)
    data = request.json
    
    event.title = data.get('title', event.title)
    event.description = data.get('description', event.description)
    event.date = data.get('date', event.date)
    event.day = data.get('day', event.day)
    event.time = data.get('time', event.time)
    event.location = data.get('location', event.location)
    
    db.session.commit()
    return jsonify(event.to_dict())

@api_bp.route('/events/<int:event_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Event deleted successfully"}), 200

@api_bp.route('/admin/users', methods=['GET'])
@jwt_required()
@admin_required
def get_users():
    query = db.session.query(User)
    users = query.all()
    return jsonify([user.to_dict() for user in users])
