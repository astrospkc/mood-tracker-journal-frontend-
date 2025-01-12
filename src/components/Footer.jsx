import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" text-yellow-600 w-full bg-black flex flex-row justify-center items-start  h-fit  bottom-0  p-4">
      {/* twitter, instagram, divnkedin, github */}
      <div className="flex-1">
        <h1 className="text-white my-3">Connect with us at -</h1>
        <div className="flex flex-col text-sm gap-2">
          <div className="flex flex-row gap-2 items-center">
            <h1>Twitter</h1>
            <a>
              <BsTwitterX />
            </a>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <h1>Instagram</h1>
            <BsInstagram />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <h1>LinkedIn</h1>
            <BsLinkedin />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <h1>Github</h1>
            <a
              href="https://github.com/astrospkc/mood-tracker-journal-frontend-"
              target="_blank"
            >
              <BsGithub />
            </a>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-white my-3">Any query? Contact us at - </h1>

        <ul className="flex flex-col text-sm gap-2">
          <div>help divne - +91 123456789</div>
          <div>email - mood_tracker@gmail.com</div>
          <div>lightMind@2025</div>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
