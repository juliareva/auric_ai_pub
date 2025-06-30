import { image_1, image_2 } from "../assets/images";
import Button from "../components/Button";
import { voiceOptions, backgroundMusic, meditationLength } from "../constants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { randomMeditationInputs } from "../constants/index";

const Main = ({ data, text, error, loading, fetchData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      navigate("/loading");
    }
  }, [loading, navigate]);

  const [userInput, setUserInput] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(voiceOptions[0]);
  const [selectedMusic, setSelectedMusic] = useState(backgroundMusic[0]);
  const [selectedLength, setSelectedLength] = useState(meditationLength[0]);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
    setIsEnglish(checkEnglish(event.target.value));
  };
  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };
  const handleMusicChange = (event) => {
    setSelectedMusic(event.target.value);
  };
  const handleLengthChange = (event) => {
    setSelectedLength(event.target.value);
  };

  const sendToBackend = () => {
    const finalUserInput = userInput
      ? userInput
      : randomMeditationInputs[
          Math.floor(Math.random() * randomMeditationInputs.length)
        ];
    fetchData(finalUserInput, selectedVoice, selectedMusic, selectedLength);
  };

  // Random details
  const handleRandomDetails = () => {
    const randomVoice = Math.floor(Math.random() * voiceOptions.length);
    setSelectedVoice(voiceOptions[randomVoice]);

    const randomMusic = Math.floor(Math.random() * backgroundMusic.length);
    setSelectedMusic(backgroundMusic[randomMusic]);

    const randomLength = Math.floor(Math.random() * meditationLength.length);
    setSelectedLength(meditationLength[randomLength]);

    const randomUserInput =
      randomMeditationInputs[
        Math.floor(Math.random() * randomMeditationInputs.length)
      ];
    setUserInput(randomUserInput);
    setIsEnglish(checkEnglish(randomUserInput));

  };

  const generateRandomMeditation = () => {
    const randomVoice = Math.floor(Math.random() * voiceOptions.length);
    const randomMusic = Math.floor(Math.random() * backgroundMusic.length);
    const randomLength = Math.floor(Math.random() * meditationLength.length);
    const selectedVoice = voiceOptions[randomVoice];
    const selectedMusic = backgroundMusic[randomMusic];
    const selectedLength = meditationLength[randomLength];
    const userInput =
      randomMeditationInputs[
        Math.floor(Math.random() * randomMeditationInputs.length)
      ];

    fetchData(userInput, selectedVoice, selectedMusic, selectedLength);
  };

  // Detect language
  const [isEnglish, setIsEnglish] = useState();

  const checkEnglish = (text) => {
    const englishPattern = /^[A-Za-z0-9\s.,!?'"()-]+$/;
    return englishPattern.test(text) ? true : false;
  };

  const languageAlert = () => {
    window.alert("Sorry, we currently support English only.");
  };

  const formPlaceholder =
    "Winter, Christmas, missing the significant other...\nAlone, deadlines, can’t wait till vacation...\nParents don’t understand that I need to grow up...";

  return (
    <div className="bg-white px-15 dark:bg-green-primary">
      <div className="pt-10 flex flex-col items-center">
        <h1 className="text-4xl font-playfair text-green-primary dark:text-white">
          AI creates your personal meditation
        </h1>
        <div className="flex mt-18 gap-5 items-center">
          <div>
            <h2 className="font-playfair text-2xl text-black dark:text-white">
              Enter what’s on your mind, and AI will create your perfect
              meditation
            </h2>
            <textarea
              className="font-lato flex outline-0 resize-none mt-10 p-7 bg-beige border-beige dark:text-green-light dark:bg-green-dark dark:border-green-dark 
              rounded-3xl shadow-md placeholder:opacity-50 placeholder:leading-10 placeholder:italic dark:caret-white dark:placeholder:text-green-light
               placeholder:text-green-secondary w-[350px] md:w-[600px] h-[300px] md:h-80 placeholder:text-lg"
              placeholder={formPlaceholder}
              value={userInput}
              onChange={handleUserInput}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                (e.target.placeholder = e.target.value ? "" : formPlaceholder)
              }
            ></textarea>
            <div className="flex justify-center gap-5 mt-15">
                <Button
                  label="Choose Details"
                  backgroundColor="bg-white"
                  textColor="text-green-primary"
                  borderColor="border-green-primary"
                  onClick={() =>
                    document
                      .getElementById("details")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                />

              <Button
                label="Generate Meditation"
                onClick={isEnglish ? sendToBackend : languageAlert}
                disabled={!userInput.trim()}
              />
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src={image_1}
              width={415}
              height={415}
              alt="woman menditating"
            />
          </div>
        </div>
      </div>

      <div className="mt-25 flex flex-col items-center">
        <h2
          id="details"
          className="text-3xl font-playfair text-black dark:text-white"
        >
          Choose Details
        </h2>
        <div className="flex mt-10 flex-col gap-15 lg:flex-row lg:gap-25 ">
          
          {/* Voice Options */}
          <div>
            <h3 className="font-playfair text-2xl text-black dark:text-white">
              Voice Options
            </h3>
            <ul className="flex flex-col mt-6 gap-4 font-lato text-lg text-black  dark:text-white leading-normal">
              {voiceOptions.map((voice) => (
                <div key={voice} className="flex gap-2 items-center ">
                  <input
                    type="radio"
                    id={voice}
                    name="voice"
                    value={voice}
                    className="accent-green-primary"
                    onChange={handleVoiceChange}
                    checked={selectedVoice === voice}
                  />
                  <label
                    htmlFor={voice}
                    className="hover:text-green-900 cursor-pointer dark:hover:text-green-200"
                  >
                    {voice}
                  </label>
                </div>
              ))}
            </ul>
          </div>

          {/* BG Music */}
          <div>
            <h3 className="font-playfair text-2xl text-black dark:text-white">
              Background Music
            </h3>
            <ul className="flex flex-col mt-6 gap-4 font-lato text-lg text-black dark:text-white leading-normal">
              {backgroundMusic.map((music) => (
                <div key={music} className="flex gap-2 items-center ">
                  <input
                    type="radio"
                    id={music}
                    name="music"
                    value={music}
                    className="accent-green-primary"
                    onChange={handleMusicChange}
                    checked={selectedMusic === music}
                  />
                  <label
                    htmlFor={music}
                    className="hover:text-green-900 cursor-pointer dark:hover:text-green-200"
                  >
                    {music}
                  </label>
                </div>
              ))}
            </ul>
          </div>

          {/* Meditation Length */}
          <div>
            <h3 className="font-playfair text-2xl text-black dark:text-white">
              Meditation Length
            </h3>
            <ul className="flex flex-col mt-6 gap-4 font-lato text-lg text-black dark:text-white leading-normal">
              {meditationLength.map((length) => (
                <div key={length} className="flex gap-2 items-center ">
                  <input
                    type="radio"
                    id={length}
                    name="length"
                    value={length}
                    className="accent-green-primary"
                    onChange={handleLengthChange}
                    checked={selectedLength === length}
                  />
                  <label
                    htmlFor={length}
                    className="hover:text-green-900 dark:hover:text-green-200 cursor-pointer"
                  >
                    {length}
                  </label>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-15">
          <Button
            label="Random"
            backgroundColor="bg-white"
            textColor="text-green-primary"
            borderColor="border-green-primary"
            onClick={handleRandomDetails}
          />

          <Button
            label="Generate"
            onClick={isEnglish ? sendToBackend : languageAlert}
            disabled={!userInput.trim()}
          />
        </div>
      </div>

      <div className="mt-25 flex flex-col items-center">
        <h2 className="text-3xl font-playfair text-black dark:text-white">
          Don’t know what you want?
        </h2>
        <div className="flex mt-15 mb-20 gap-20 justify-center items-center w-{415} h-{415} lg:flex-row flex-col">
          <img src={image_2} alt="man meditating" />
          <Button
            label="Generate random meditation"
            onClick={generateRandomMeditation}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
