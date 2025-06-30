import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchMeditation } from "./services/api";
import CreateMeditation from "./pages/CreateMeditation";
import Main from "./pages/Main";
import Meditation from "./pages/Meditation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";


function App() {

  // Dark Theme
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Create Meditation
  const { data, text, error, loading, fetchData, abortRequest } = useFetchMeditation();

  return ( <>
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    <ScrollToTop/>
     <Routes>
      <Route path="/" element={< Main {...{ data, text, error, loading, fetchData, abortRequest }}/>}/>
      <Route path="/loading" element={<CreateMeditation {...{ data, text, error, loading, fetchData, abortRequest }}/>}/>
      <Route path="/meditation" element={<Meditation {...{ data, text, error, loading, fetchData, abortRequest }}/>}/>
     </Routes>
     <Footer />
     </>
  );
}

export default App;
