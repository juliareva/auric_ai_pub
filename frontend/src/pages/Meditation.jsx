import Button from "../components/Button";
import { image_2 } from "../assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faThumbsUp as faThumbsUpRegular,
  faThumbsDown as faThumbsDownRegular,
} from "@fortawesome/free-regular-svg-icons";
import AudioPlayer from "../components/AudioPlayer";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 


const Meditation = ({ data, text, error, loading, fetchData }) => {

  const navigate = useNavigate(); 

  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = () => {
    setFeedback("");
    window.alert("Thank you for your feedback!");
  };

  return (
    <div className="bg-white px-15 dark:bg-green-primary ">
      <div className="pt-10 flex flex-col items-center">
        <h1 className="text-4xl font-playfair text-black dark:text-white">
          Your personal meditation is ready!
        </h1>
        <div className="flex mt-18 gap-10 items-center">
          <div>
            <h2 className="font-playfair text-2xl text-black dark:text-white">
              We&apos;ve personalized your input into a one-of-a-kind meditation
              experience!
            </h2>

            <div className="mt-15 flex lg:flex-row flex-col items-center lg:items-start gap-20 flex-1">
              <div className="flex flex-col items-center">
                <div className="">
                  <AudioPlayer audioURL={data} />
                </div>
                <div className="flex flex-col xl:flex-row justify-center gap-5 mt-10">
                <Button
                    label="Regenerate"
                    backgroundColor="bg-white"
                    textColor="text-green-primary"
                    borderColor="border-green-primary"
                    onClick={() => navigate("/")} 
                  />
                  <Button
                    label="End Session"
                    onClick={() => navigate("/")}
                  />
                </div>
              </div>

              <div>
                <div className="font-lato leading-relaxed outline-0 resize-none p-7 bg-beige border-beige dark:text-green-light dark:bg-green-dark
                 dark:border-green-dark rounded-3xl shadow-md dark:caret-white w-[400px] md:w-[600px] min-h-[300px] sm:w-[500px]">
                  <span style={{ whiteSpace: "pre-line" }}>{text}</span>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex gap-5 ">
                    <div className="relative group">
                      <FontAwesomeIcon
                        icon={faHeartRegular}
                        className="text-black text-lg hover:text-gray-500 cursor-pointer dark:text-white dark:hover:text-green-800"
                      />
                      <span className="absolute top-6 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform delay-200 bg-gray-500 text-white text-xs rounded px-2 py-1">
                        Save to Favorites
                      </span>
                    </div>
                    <div className="relative group">
                      <a href={data} download="meditation.mp3"><FontAwesomeIcon
                        icon={faDownload}
                        className="text-black text-lg hover:text-gray-500 cursor-pointer dark:text-white dark:hover:text-green-800"
                      />
                      <span className="absolute top-6 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform delay-200 bg-gray-500 text-white text-xs rounded px-2 py-1">
                        Download
                      </span></a>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="relative group">
                      <FontAwesomeIcon
                        icon={faThumbsUpRegular}
                        className="text-black text-lg hover:text-gray-500 cursor-pointer dark:text-white dark:hover:text-green-800"
                      />
                      <span className="absolute top-6 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform delay-200 bg-gray-500 text-white text-xs rounded px-2 py-1">
                        Like
                      </span>
                    </div>
                    <div className="relative group">
                      <FontAwesomeIcon
                        icon={faThumbsDownRegular}
                        className="text-black text-lg hover:text-gray-500 cursor-pointer scale-x-[-1] dark:text-white dark:hover:text-green-800"
                      />
                      <span className="absolute top-6 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform delay-200 bg-gray-500 text-white text-xs rounded px-2 py-1">
                        Dislike
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-25 flex flex-col items-center">
        <h2 className="text-3xl font-playfair text-black dark:text-white">
          Tell us what you think
        </h2>

        <div className="flex lg:flex-row flex-col-reverse mt-15 mb-20 gap-20 ">
          <div className="flex items-center justify-center w-{415} h-{415}">
            <img src={image_2} alt="man meditating" />
          </div>

          <div className="flex flex-col">
            <textarea
              className="font-lato flex outline-0 resize-none p-7 bg-beige border-beige dark:text-green-light dark:bg-green-dark
               dark:border-green-dark rounded-3xl shadow-md placeholder:opacity-50 placeholder:leading-10  dark:caret-white dark:placeholder:text-green-light
                placeholder:text-green-secondary placeholder:text-lg w-[350px] sm:w-[500px] md:w-[600px] min-h-[300px] md:h-80"
              placeholder="Please share your thougths"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                (e.target.placeholder = e.target.value
                  ? ""
                  : "Please share your thougths")
              }
            ></textarea>
            <div className="mt-10 flex justify-center">
              <Button label="Leave feedback" onClick={handleFeedbackSubmit}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meditation;
