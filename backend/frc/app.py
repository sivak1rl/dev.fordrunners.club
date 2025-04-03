from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from frc.blueprints.api import api_bp
from frc.extensions import db, migrate

def create_app(test_config=None):
    app = Flask(__name__, static_folder='../../frontend/dist')
    
    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get('SECRET_KEY', 'dev-key-please-change-in-production'),
        )
        if os.environ.get('DATABASE_URL'):
            app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
        else:
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ford_runners.db'
        
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    else:
        app.config.update(test_config)
    
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    app.register_blueprint(api_bp, url_prefix='/api')
    with app.app_context():
        import frc.models
        db.create_all()
    return app
    
# Create app instance for running directly
app = create_app()

if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    app.run(debug=debug_mode)
