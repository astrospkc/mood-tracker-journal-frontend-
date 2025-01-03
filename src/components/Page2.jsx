// import React, { useEffect, useState } from "react";
import Card from "./Card";
import chart from "../images/chart.jpg";
const Page2 = () => {
  //   const [visibleCards, setVisibleCards] = useState([]);
  const cardsData = [
    {
      id: 1,
      className: "bg-yellow-300 absolute top-[40%] left-[10%] h-[35%]",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo rerum incidunt distinctio obcaecati voluptatem sit totam, vitae tenetur similique esse nobis? Rerum commodi fugiat explicabo, quae iure amet beatae porro? ",
      heading: "the heading",
    },
    {
      id: 2,
      className: "bg-yellow-200 rotate-6 absolute top-[35%] left-[20%] h-[35%]",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo rerum incidunt distinctio obcaecati voluptatem sit totam, vitae tenetur similique esse nobis? Rerum commodi fugiat explicabo, quae iure amet beatae porro? ",
      heading: "the heading",
    },
    {
      id: 3,
      className:
        "bg-yellow-500 rotate-12 absolute top-[30%] left-[30%] h-[35%]",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo rerum incidunt distinctio obcaecati voluptatem sit totam, vitae tenetur similique esse nobis? Rerum commodi fugiat explicabo, quae iure amet beatae porro? ",
      heading: "the heading ",
    },
  ];

  //   useEffect(() => {
  //     const timers = [];
  //     cardsData.forEach((card, index) => {
  //       const timer = setTimeout(() => {
  //         setVisibleCards((prev) => [...prev, card.id]);
  //       }, index * 1000);
  //       timers.push(timer);
  //     });
  //     return () => timers.forEach((timer) => clearTimeout(timer));
  //   }, []);

  return (
    <>
      <div className="flex  bg-black items-center p-10 text-2xl h-full">
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
      </div>
    </>
  );
};

export default Page2;

//  <div className="flex  bg-black items-center p-10 text-2xl h-full">
//    <div className="relative flex-1  w-full h-[100%] ">
//      <Card className="bg-yellow-300 absolute top-[40%] left-[10%] h-[35%]  " />
//      <Card className="bg-yellow-200 rotate-6 absolute top-[35%] left-[20%] h-[35%]" />

//      <Card className="bg-yellow-500 rotate-12 absolute top-[30%] left-[30%] h-[35%]" />

//      {/* </div> */}
//    </div>
//    <div className="flex-1 ml-20">
//      the chart area
//      <img
//        src={chart}
//        alt="the chart image"
//        height={400}
//        width={400}
//        className="rounded-2xl"
//      />
//    </div>
//  </div>;
