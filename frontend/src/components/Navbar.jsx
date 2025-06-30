import { logo_light, logo_dark } from "../assets/images";

const Navbar = ({darkMode, toggleDarkMode}) => {

const handleSignIn = () => {
  window.alert("Sign In and Sign Up are still under construction — hang tight!")
}

  return (
    <div className="px-15 py-5 bg-white flex flex-1 text-black items-center md:justify-between gap-5 flex-col md:flex-row w-full dark:bg-green-primary dark:text-white ">
      <div><a href="/"><img src={darkMode ? logo_dark : logo_light} width={177} height={60} alt="logo" /></a>
        
      </div>
      <div className="flex items-center font-lato cursor-pointer text-lg gap-7">
        <a href="/" onClick={handleSignIn}>Sign In</a>
        <a href="/" onClick={handleSignIn}>Sign Up</a>
        <button
          className=" px-5 py-2 border-green-primary border rounded-full cursor-pointer hover:bg-green-light dark:hover:bg-green-light dark:hover:text-black dark:border-green-light"
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
