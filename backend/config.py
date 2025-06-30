import os
import json
import tempfile
import atexit
from dotenv import load_dotenv

# Load environment variables from .env file (for local development)
load_dotenv()

class Config:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

    # Google Cloud Key (relative path to gcloud.json)
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    # Load Google Cloud credentials from environment variable
    GOOGLE_APPLICATION_CREDENTIALS_JSON = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")

    @staticmethod
    def setup_google_credentials():
        """Creates a temporary file for Google credentials and sets the environment variable."""
        if Config.GOOGLE_APPLICATION_CREDENTIALS_JSON:
            # Create a temporary file
            temp_file = tempfile.NamedTemporaryFile(delete=False, mode="w")

            json.dump(json.loads(Config.GOOGLE_APPLICATION_CREDENTIALS_JSON), temp_file)  # Write JSON
            temp_file.flush()  # Ensure all data is written

            # Set the temporary file path as GOOGLE_APPLICATION_CREDENTIALS
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = temp_file.name

            # Register cleanup to delete the file on shutdown
            def cleanup_temp_file():
                if os.path.exists(temp_file.name):
                    os.unlink(temp_file.name)  # Delete the temp file
                    print(f"Deleted temp credentials file: {temp_file.name}")

            atexit.register(cleanup_temp_file)
