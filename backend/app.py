from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

# Update static folder path to point to the Vite build output
app = Flask(__name__, static_folder='../frontend/dist')

# Make sure the base route serves index.html from the built React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')