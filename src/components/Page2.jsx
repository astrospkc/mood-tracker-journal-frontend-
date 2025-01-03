// import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { motion } from "framer-motion";
import chart from "../images/chart.jpg";
import { useContext } from "react";
import { ClickContext } from "../context/CardClickedProvider.jsx";
const Page2 = () => {
  const { clicked } = useContext(ClickContext);
  const cardsData = [
    {
      id: 1,
      className:
        "bg-yellow-300 absolute top-[40%] left-[10%] h-[60%] md:h-[30%]",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo rerum incidunt distinctio obcaecati voluptatem sit totam, vitae tenetur similique esse nobis? Rerum commodi fugiat explicabo, quae iure amet beatae porro? ",
      heading: "the heading",
    },
    {
      id: 2,
      className:
        "bg-yellow-200 rotate-6 absolute top-[35%] left-[20%] h-[60%] md:h-[30%]",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo rerum incidunt distinctio obcaecati voluptatem sit totam, vitae tenetur similique esse nobis? Rerum commodi fugiat explicabo, quae iure amet beatae porro? ",
      heading: "the heading",
    },
    {
      id: 3,
      className:
        "bg-yellow-500 rotate-12 absolute top-[30%] left-[30%] h-[60%] md:h-[30%]",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo rerum incidunt distinctio obcaecati voluptatem sit totam, vitae tenetur similique esse nobis? Rerum commodi fugiat explicabo, quae iure amet beatae porro? ",
      heading: "the heading ",
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row bg-black items-center p-10 text-2xl h-full w-full">
        <div className="relative flex-1  w-full h-[100%] ">
          {cardsData.map((card) => (
            //   visibleCards.includes(card.id) && (
            <Card
              key={card.id}
              className={card.className}
              desc={card.desc}
              heading={card.heading}
            />
          ))}
        </div>
        {clicked && (
          <motion.div
            animate={{ x: 20 }}
            transition={{ duration: 0.3, ease: ["easeIn", "easeOut"] }}
          >
            <div className="flex-1 ml-20">
              the chart area
              <img
                src={chart}
                alt="the chart image"
                height={400}
                width={400}
                className="rounded-2xl"
              />
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Page2;
