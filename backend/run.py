import os
from frc import create_app

if __name__ == '__main__':
    app = create_app()
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    app.run(debug=debug_mode)
