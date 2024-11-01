import React from "react";
import IEEEJMI from "../../assets/logo/IEEEJMI.svg";
import route from "./routes";
import { NavLink } from "react-router-dom";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

function Footer() {
  return (
    <div className="flex md:flex-row flex-col w-full p-14 font-body">
      <div className="md:w-1/2">
        <img src={IEEEJMI} alt="IEEE JMI" className="w-48" />
      </div>
      <div className="md:w-1/4">
        <ul className="flex flex-col text-center md:text-left my-3 md:my-0">
          {route.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                key={index}
                className="mx-3 md:font-semibold text-black/60 md:text-black/40 hover:text-black hover:text-lg transition-all"
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex md:flex-col justify-center md:justify-start">
        <p className="hidden md:block">Follow Us On:</p>
        <div className="flex gap-4 md:gap-0 my-3 md:my-0">
          <AiFillInstagram
            className="
          md:w-7 
          w-9 h-auto
          text-pink-600"
          />
          <AiFillLinkedin
            className="md:w-7 
            h-auto w-9
            text-blue-400
          "
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
