# frc/blueprints/auth.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token, create_refresh_token, 
    jwt_required, get_jwt_identity, get_jwt
)
from frc.models.user import User
from frc.extensions import db, jwt

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    
    # Validate required fields
    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    # Check if user already exists
    if User.query.filter_by(username=data.get('username')).first():
        return jsonify({"error": "Username already exists"}), 409
    
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"error": "Email already exists"}), 409
    
    # Create new user
    user = User(
        username=data.get('username'),
        email=data.get('email'),
        password=data.get('password')
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Create tokens
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    
    return jsonify({
        'user': user.to_dict(),
        'access_token': access_token,
        'refresh_token': refresh_token
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    
    # Find user by username or email
    user = User.query.filter_by(username=data.get('username')).first() or \
           User.query.filter_by(email=data.get('username')).first()
    
    if not user or not user.check_password(data.get('password')):
        return jsonify({"error": "Invalid credentials"}), 401
    
    # Create tokens
    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={'is_admin': user.is_admin}
    )
    refresh_token = create_refresh_token(identity=str(user.id))
    
    return jsonify({
        'user': user.to_dict(),
        'access_token': access_token,
        'refresh_token': refresh_token
    })

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    
    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={'is_admin': user.is_admin}
    )
    
    return jsonify({'access_token': access_token})

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(user.to_dict())

# Additional route to check if token is valid (useful for frontend)
@auth_bp.route('/verify', methods=['GET'])
@jwt_required()
def verify_token():
    return jsonify({"valid": True})