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
            # Add other configuration settings here
        )
    else:
        # Load test config
        app.config.update(test_config)
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/api')
    
    # Serve React frontend
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')
    
    return app

# Create app instance for running directly
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)