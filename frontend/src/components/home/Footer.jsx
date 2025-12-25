import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-5">
      {/* Convex bar */}
      <div
        className="
          relative
          w-full
          h-[110px] sm:h-[130px]
          rounded-t-[100%_70px]
          bg-cover bg-center
          flex items-end
          px-4 sm:px-8
        "
        style={{ backgroundImage: "url('/assets/snowtexture.jpg')" }}
      >
        
        <div className="w-full flex items-center justify-between">
          
          
          <img
            src="/assets/snowman.png"
            alt="snowman"
            className="
              h-40 sm:h-52 md:h-60
              -mt-32 sm:-mt-40
              pointer-events-none
              select-none
            "
          />

          
          <div className="flex flex-wrap p-2 bg-black rounded-md gap-4 sm:gap-6">


            <a
              href="mailto:avidhahaldar17@gmail.com"
              className="hover:scale-110 transition"
            >
              <FontAwesomeIcon icon={faEnvelope} size="lg" beat/>
            </a>


            <a
              href="https://github.com/FrostedPetals"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" beat/>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
