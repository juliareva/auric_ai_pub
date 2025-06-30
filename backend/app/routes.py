import os
from flask import send_file, make_response, Blueprint, send_from_directory, redirect, request, current_app, Response
import base64
import openai
from app.main import get_meditation_text, clean_text, normalize_newlines, synthesize_text, merge_audio

# Define the private folder path (outside of static/)
PRIVATE_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "files")
MUSIC_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "files/music")

main = Blueprint("main", __name__)

aborted_req_dict = {}

frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

@main.route("/", defaults={"filename":""})
@main.route("/<path:filename>")
def index(filename):
    if filename == "meditation" or filename == "loading":
        return redirect("/", code=302)
    
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

#Aborting request
@main.route("/abort_id", methods=['POST', 'OPTIONS'])
def abort_id():

    if request.method == "OPTIONS":
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Cache-Control, Pragma, Expires"
        return response

    data = request.json
    req_ID = data.get("req_ID")
    aborted_req_dict[req_ID] = True
    return ""


# Generating medetation
@main.route('/audio', methods=['POST', 'OPTIONS'])
def audio():

    if request.method == "OPTIONS":
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Cache-Control, Pragma, Expires"
        return response


    data = request.json
    text = data.get("text")
    voice = data.get("voice")
    music = data.get("music")
    length = data.get("length")
    req_ID = data.get("req_ID")

    music_path = os.path.join(MUSIC_FOLDER, music.lower() + ".mp3")

    # KEYS
    openai.api_key = current_app.config["OPENAI_API_KEY"]  # Get API key from config


    # Checking if request is aborted
    if req_ID in aborted_req_dict:
        return Response("Request aborted by client", status=499)

    # Request meditation from Open AI
    utf8_text = get_meditation_text(text, length)

    clean_meditation_text = normalize_newlines(clean_text(utf8_text).strip())

    encoded_text = base64.b64encode(clean_meditation_text.encode("utf-8")).decode("ascii")


    # Checking if request is aborted
    if req_ID in aborted_req_dict:
        return Response("Request aborted by client", status=499)


    # Getting TTS response from G Cloud
    audio_buffer = synthesize_text(utf8_text, voice)


    # Checking if request is aborted
    if req_ID in aborted_req_dict:
        return Response("Request aborted by client", status=499)

    merged_meditation = merge_audio(audio_buffer, music_path, length)

    # Sending merged meditation to frontend
    response = make_response(send_file(merged_meditation, as_attachment=True, download_name="final_meditation_audio.mp3", mimetype="audio/mpeg"))
    response.headers["X-Meditation"] = encoded_text
    response.headers["X-File-Info"] = "Meditation MP3 file"
    response.headers["X-Custom-ID"] = req_ID

    return response