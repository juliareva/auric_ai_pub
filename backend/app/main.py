import openai
from openai import OpenAI
import re
from bs4 import BeautifulSoup
from google.cloud import texttospeech
import io
from pydub import AudioSegment




# Getting meditation text from Open AI
def get_meditation_text(text, length):
        print("1 step")
        length_mapping = {
        "2 Minutes": (300, 340),
        "4 Minutes": (500, 580),
        "6 Minutes": (700, 820),
        "8 Minutes": (900, 1060),
        "10 Minutes": (1200, 1400),
        }

        def calculate_word_count():
            if length in length_mapping:
                min_words, max_words = length_mapping[length]
                average = (min_words + max_words) // 2
            return average

        word_count = calculate_word_count()

        client = OpenAI(api_key=openai.api_key)
        response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
               "content": (
                        f"Create a guided meditation script based on the given text. "
                        f"The meditation should be peaceful, immersive, and structured for relaxation. "
                        f"**STRICT REQUIREMENTS (DO NOT IGNORE):**"
                        f"\n- **MUST** have between **{word_count - 15}** and **{word_count + 15}** words. "
                        f"\n- **DO NOT EXCEED OR FALL BELOW THIS RANGE.**"
                        f"**Before finalizing the response, ensure it contains between {word_count - 15} and {word_count + 15} words.**"
                        f"\n- If the word count is incorrect, you **MUST** discard the response and regenerate."
                        f"\n- If additional expansion is needed, describe the environment more vividly and extend breathing guidance."
                        f"Ensure the output **MUST** be specifically {word_count} words, providing detailed imagery, guidance, and pauses for relaxation."
                        f"### **SSML Formatting (STRICTLY FOLLOW THIS FORMAT)**:"
                        f"\n- **MUST** wrap the entire meditation in <prosody rate='5%'> ... </prosody> to slow down speech."
                        f"\n- **MUST** insert <break time='2s'/> after every comma in the text to ensure slow pace. You absolutely have to put <break time='2s'/> after every comma, double check that."
                        f"\n- **MUST** insert <break time='2s'/><break time='3s'/> between different sentences to ensure a total 5-second pause. You absolutely have to put <break time='2s'/><break time='3s'/> between different sentences, double check that."
                        f"\n- **MUST** insert <break time='2s'/><break time='3s'/> between different passages or topic shifts. You absolutely have to put <break time='2s'/><break time='3s'/> between different passages, double check that."
                        f"\n- **DO NOT** use a single <break time='5s'/> as Google TTS ignores long pauses."
                        f"**Your response MUST strictly follow these constraints. If it does not, generate a new response that meets all requirements.**"


                    ),
            },
            {
                "role": "user",
                "content": text,
            },
        ],
    )
        return response.choices[0].message.content

# Cleaning meditation text
def clean_text(ssml_string):
    soup = BeautifulSoup(ssml_string, "lxml")
    return soup.get_text()

def normalize_newlines(clean_meditation_text):
    return re.sub(r'\n+', '\n\n', clean_meditation_text)


# Getting TTS response from G Cloud
def synthesize_text(text, voice_gender):
    print("2 step")
    client = texttospeech.TextToSpeechClient()

    input_text = texttospeech.SynthesisInput(ssml=text)

    if voice_gender == "Female":
        voice_name = "en-US-Standard-C"
        gender = texttospeech.SsmlVoiceGender.FEMALE
    elif voice_gender == "Male":
        voice_name = "en-US-Standard-J"
        gender = texttospeech.SsmlVoiceGender.MALE
    else:
        voice_name = "en-US-Standard-E"
        gender = texttospeech.SsmlVoiceGender.FEMALE

    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name=voice_name,
        ssml_gender=gender,
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = client.synthesize_speech(
        request={"input": input_text, "voice": voice, "audio_config": audio_config}
    )

    audio_buffer = io.BytesIO(response.audio_content)
    audio_buffer.seek(0)

    return audio_buffer

# Merging voice and music
def merge_audio(file_path, music_path, length):

    print("3 step")
    meditation_voice = AudioSegment.from_file(file_path)
    bg_music = AudioSegment.from_file(music_path)

    slower_voice = meditation_voice

    if len(slower_voice) > len(bg_music):
        if len(slower_voice) % len(bg_music) == 0:
            bg_music = bg_music * (len(slower_voice) // len(bg_music))
        else:
            bg_music = bg_music * (len(slower_voice) // len(bg_music) + 1)

    slower_voice = slower_voice + 5
    bg_music = bg_music - 10

    length_ms = {
        "2 Minutes": 120000,
        "4 Minutes": 240000,
        "6 Minutes": 360000,
        "8 Minutes": 480000,
        "10 Minutes": 600000,
    }

    if length_ms[length] > len(slower_voice):
        final_audio = bg_music.overlay(slower_voice)
    else:
        final_audio = slower_voice.overlay(bg_music)



    buffer = io.BytesIO()
    final_audio.export(buffer, format="mp3")
    buffer.seek(0)

    return buffer