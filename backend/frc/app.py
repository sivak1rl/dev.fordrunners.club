from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from frc.blueprints.api import api_bp


def create_app(test_config=None):
    # Create Flask app instance
    app = Flask(__name__, static_folder='../../frontend/dist')
    
    # Configure app
    if test_config is None:
        # Load production config
        app.config.from_mapping(
            SECRET_KEY=os.environ.get('SECRET_KEY', 'dev-key-please-change-in-production'),
        )
    else:
        # Load test config
        app.config.update(test_config)
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/api')
    return app
    
# Create app instance for running directly
app = create_app()

if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    app.run(debug=debug_mode)
