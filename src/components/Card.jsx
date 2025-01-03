import { motion, useInView } from "framer-motion";
import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ClickContext } from "../context/CardClickedProvider";
import { BsFillHandIndexThumbFill } from "react-icons/bs";

const Card = ({ className, heading, desc }) => {
  const { clicked, setClicked } = useContext(ClickContext);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const handleClick = () => {
    setClicked((prev) => !prev);
    console.log("clicked the summarize button: ", clicked);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.0, delay: 0.1 }}
      className={`rounded-3xl p-4 bg-white  justify-center items-start flex flex-col hover:bg-white hover:cursor-pointer  ${className}`}
    >
      <div className="text-sm ">{heading}</div>
      <p className="text-xs">
        <q>{desc} </q>
      </p>
      <div className="relative ">
        <button
          onClick={handleClick}
          className=" text-sm bg-white my-3 rounded-xl hover:bg-yellow-400 p-3"
        >
          Summarize
        </button>
        <div className="absolute bottom-0 right-0 flex flex-row ">
          <BsFillHandIndexThumbFill className="text-black " />
        </div>
      </div>
    </motion.div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default Card;

// heading
// the para in quoted
// summarize button
