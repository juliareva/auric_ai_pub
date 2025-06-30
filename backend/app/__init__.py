from flask import Flask
from flask_cors import CORS
from config import Config  # Import the Config class

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Load settings from config.py
    CORS(app, expose_headers=["X-Meditation"], origins=["http://localhost:5173"])

    Config.setup_google_credentials()

    from app.routes import main
    app.register_blueprint(main)  # Assuming routes.py has a blueprint named 'main'

    return app