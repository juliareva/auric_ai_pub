import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const useFetchMeditation = () => {
  const [data, setData] = useState(null);
  const [text, setText] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reqId, setReqId] = useState();

  const navigate = useNavigate();

  const fetchData = (
    userInput,
    selectedVoice,
    selectedMusic,
    selectedLength
  ) => {
    const uniqueId = uuidv4();

    setLoading(true);
    setError(null);
    setReqId(uniqueId);
    setData(null);
    setText(null);

    axios
      .post(
        `${window.location.origin}/audio`,
        {
          text: userInput,
          voice: selectedVoice,
          music: selectedMusic,
          length: selectedLength,
          req_ID: uniqueId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const audioURL = URL.createObjectURL(response.data);
        setData(audioURL);
        setText(atob(response.headers["x-meditation"]));
      })
      .catch((error) => {
        let showErrorAlert = true;
        if (error.response && error.response.status === 499) {
          showErrorAlert = false;
        }
        if (showErrorAlert) {
          window.confirm("Something went wrong. Try again later.");
          navigate("/");
        }
      })
      .finally(() => setLoading(false));
  };

  // Abort the request manually when user clicks "Regenerate" or "End Session"
  const abortRequest = () => {
    setLoading(false);
    axios.post(
      `${window.location.origin}/abort_id`,
      {
        req_ID: reqId,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  return { data, text, error, loading, fetchData, abortRequest };
};
