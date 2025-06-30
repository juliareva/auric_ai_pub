const Button = ({ label, backgroundColor, textColor, borderColor, onClick, disabled }) => {
  
  // Base styles
  let baseStyles = "flex justify-center items-center px-7 py-4 border rounded-full font-playfair text-xl leading-none transition";

  // Disabled styles
  if (disabled) {
    baseStyles += " bg-gray-400 text-gray-200 border-gray-400 cursor-not-allowed dark:bg-gray-700 dark:border-gray-700";
  } else {
    // Active state styles
    if (backgroundColor) {
      baseStyles += ` ${backgroundColor} ${textColor} ${borderColor} dark:bg-green-primary dark:border-beige-primary dark:text-beige-primary`;
    } else {
      baseStyles += " bg-green-primary text-white border-green-primary dark:bg-beige-primary dark:text-green-primary dark:border-beige-primary";
    }
  }

  // Add hover styles only if the button is NOT disabled
  if (!disabled) {
    baseStyles += backgroundColor
      ? " hover:bg-green-light dark:hover:bg-green-dark"
      : " hover:bg-green-dark dark:hover:bg-green-light";
  }

  return (
    <button className={baseStyles} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;