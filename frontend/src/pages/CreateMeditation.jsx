import { useEffect, useState } from "react";
import { image_3, image_4 } from "../assets/images";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { randomFacts } from "../constants";
import { useNavigate } from "react-router-dom";

const CreateMeditation = ({
  data,
  error,
  loading,
  fetchData,
  abortRequest,
}) => {
  // Random Fact
  const [randomFact, setRandomFact] = useState(randomFacts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newFact =
        randomFacts[Math.floor(Math.random() * randomFacts.length)];
      setRandomFact(newFact);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // Navigate to next page when data loaded
  const navigate = useNavigate();

  useEffect(() => {
    if (data && !error) {
      navigate("/meditation");
    }
  }, [data, error, navigate]);

  return (
    <div className="bg-white px-15 dark:bg-green-primary">
      <div className="pt-10 flex flex-col items-center">
        <h1 className="text-4xl font-playfair text-black dark:text-white">
          AI is creating your personal meditation...
        </h1>
        <div className="flex mt-18 gap-10 items-center">
          <div>
            <h2 className="font-playfair text-2xl text-black dark:text-white">
              Thank you for your wait!
            </h2>

            <div className="mt-15">
              <Loading />
            </div>

            <div className="flex md:flex-row flex-col md:justify-center items-center gap-5 mt-20">
              <Button
                label="Regenerate"
                backgroundColor="bg-white"
                textColor="text-green-primary"
                borderColor="border-green-primary"
                onClick={() => {
                  abortRequest();
                  navigate("/");
                }}
              />

              <Button
                label="End Session"
                onClick={() => {
                  abortRequest();
                  navigate("/");
                }}
              />
            </div>
          </div>
          <div>
            <img
              src={image_3}
              width={415}
              height={415}
              alt="woman menditating"
              className="hidden lg:block"
            />
          </div>
        </div>
      </div>

      <div className="mt-25 flex flex-col items-center">
        <h2 className="text-3xl font-playfair text-black dark:text-white">
          Do you know?...
        </h2>
        <div className="flex md:flex-row flex-col-reverse mt-15 mb-20 gap-20 ">
          <div className="flex items-center justify-center w-{415} h-{415}">
            <img src={image_4} alt="man meditating" />
          </div>
          <div className="flex flex-1 md:w-[500px] text-black font-playfair text-lg leading-10 mt-5 dark:text-white">
            <span>{randomFact.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeditation;
