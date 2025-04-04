from datetime import timedelta
from flask import Flask, jsonify
from flask_cors import CORS
import os

from frc.blueprints.api import api_bp
from frc.blueprints.auth import auth_bp
from frc.extensions import db, migrate, jwt, bcrypt


def create_app(test_config=None):
    app = Flask(__name__, static_folder="../../frontend/dist")

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get(
                "SECRET_KEY", "dev-key-please-change-in-production"
            ),
            SQLALCHEMY_DATABASE_URI=os.environ.get(
                "DATABASE_URL", "sqlite:///ford_runners.db"
            ),
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
            JWT_SECRET_KEY=os.environ.get(
                "JWT_SECRET_KEY", "jwt-secret-key-change-in-production"
            ),
            JWT_ACCESS_TOKEN_EXPIRES=(
                60 * 60 if os.environ.get("FLASK_ENV") == "production" else 60 * 5
            ),
            JWT_REFRESH_TOKEN_EXPIRES=(
                60 * 60 * 24 * 365
                if os.environ.get("FLASK_ENV") == "production"
                else 60 * 30
            ),
            JWT_TOKEN_LOCATION = ['headers'],
            JWT_COOKIE_CSRF_PROTECT = False,
        )
    else:
        app.config.update(test_config)
        app.config["JWT_SECRET_KEY"] = "jwt-secret-key-change-in-production"

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    app.register_blueprint(api_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    flask_env = os.environ.get("FLASK_ENV", "development")
    if flask_env == 'development':
        CORS(
            app,
            supports_credentials=True,
            origins=os.environ.get("FRONTEND_ORIGIN", "https://dev.fordrunners.club:8443")
        )
    elif flask_env == 'local':
        CORS(
            app,
            supports_credentials=True,
            origins=os.environ.get("FRONTEND_ORIGIN", "http://10.10.10.10:3000")
        )
    else:
        CORS(
            app,
        )

    with app.app_context():
        db.create_all()
        
    return app


if __name__ == "__main__":
    debug_mode = os.environ.get("FLASK_ENV") == "development"
    app = create_app()
    app.run(debug=debug_mode)
