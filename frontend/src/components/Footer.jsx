import { logo_dark } from "../assets/images";
import { footerLinks } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="bg-green-primary px-15 py-15 text-white font-lato text-md leading-normal dark:bg-green-dark">
      <div className="flex md:flex-row md:justify-between flex-col-reverse items-center gap-10">
        {/* LOGO */}
        <div>
          <img src={logo_dark} width={177} height={60} alt="logo" />
        </div>

        {/* FOOTER LINKS */}
        <div className="flex gap-10 md:flex-row flex-col items-start">

          {/* RENDER LINKS */}
          <div className="flex md:flex-row gap-10 flex-col">
            {footerLinks.map((link) => (
              // SECTION
              <div key={link.title} className="flex flex-col gap-2  ">
                <p className="uppercase text-center">{link.title}</p>
                {link.links.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    className="hover:text-beige"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* FOLLOW LINKS */}
          <div className="flex flex-col">
            <p className="uppercase text-center">Follow Us</p>

            {/* ICONS */}
            <div className="flex gap-5 mt-4">
              <FontAwesomeIcon
                icon={faTwitter}
                className=" text-white text-xl hover:text-beige cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className=" text-white text-xl hover:text-beige cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faFacebook}
                className=" text-white text-xl hover:text-beige cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
