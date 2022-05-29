import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import IconRock from "./assets/icons/icon-rock.svg";
import IconPaper from "./assets/icons/icon-paper.svg";
import IconScissors from "./assets/icons/icon-scissors.svg";

export function GameItem({
  children,
  color,
  bgColor,
  onClick,
  size = "medium",
}) {
  const wraperSize = {
    medium: "w-[8rem] md:w-[12rem] h-[8rem] md:h-[12rem]",
    large: "w-[8rem] md:w-[16rem] h-[8rem] md:h-[16rem]",
  };

  const childSize = {
    medium: "w-[6rem] md:w-[10rem] h-[6rem] md:h-[10rem]",
    large: "w-[6rem] md:w-[12rem] h-[6rem] md:h-[12rem]",
  };

  return (
    <button
      onClick={onClick}
      style={{
        boxShadow: "0 3px 3px rgb(0 0 0 / 25%)",
        backgroundColor: bgColor,
      }}
      className={`${wraperSize[size]} transition-all duration-500 hover:scale-[1.1]  relative rounded-full`}
    >
      <div
        className={` bg-gradient-to-br ${color} translate-y-[-2px] scale-[1] md:translate-y-[-7px] md:scale-[1.03] ${wraperSize[size]} relative rounded-full`}
      ></div>
      <div
        className={`bg-[#bfbfbf] absolute left-[50%] translate-x-[-50%] translate-y-[-55%] top-[50%] ${childSize[size]} rounded-full`}
      >
        <div
          className={`bg-[#ddd] ${childSize[size]} translate-y-[4px] scale-[1.02] md:translate-y-[7px] md:scale-[1.02] rounded-full`}
        ></div>
      </div>
      <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
        {children}
      </div>
    </button>
  );
}

function App() {
  const item = ["kertas", "gunting", "batu"];
  const itemIcon = [IconPaper, IconScissors, IconRock];
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);

  const generateRandom = (computer) => {
    const user = selected;
    setStatus(checkStatus(user, computer));
    if (checkStatus(user, computer) === "win") {
      setScore(score + 1);
    } else {
      if (score > 0) {
        setScore(score - 1);
      }
    }
  };

  const checkStatus = (user, computer) => {
    if (user === computer) {
      return "draw";
    } else if (user === 0 && computer === 1) {
      return "lose";
    } else if (user === 1 && computer === 2) {
      return "lose";
    } else if (user === 2 && computer === 0) {
      return "lose";
    } else {
      return "win";
    }
  };

  //generate a random number but exclude some numbers
  const generateRandomNumber = (min, max, exclude) => {
    let random = Math.floor(Math.random() * (max - min) + min);
    if (random === exclude) {
      return generateRandomNumber(min, max, exclude);
    } else {
      return random;
    }
  };

  useEffect(() => {
    // const computer = Math.floor(Math.random() * 3);
    const computer = generateRandomNumber(0, 3, selected);
    setComputerSelect(computer);
    if (selected !== null) {
      generateRandom(computer);
    }
  }, [selected]);

  return (
    <div className="flex justify-center bg-gradient-to-b from-[#1f3756] to-[#141539] text-white overflow-hidden">
      <div className="lg:max-w-5xl w-full min-h-screen">
        <div
          className={`m-5 md:mx-0 md:my-8 ${
            selected === null ? "pb-20" : "pb-10"
          }`}
        >
          <div className="flex justify-between items-center border-4 border-outline rounded p-4">
            <h1 className="font-bold text-gray leading-[1.2rem] md:leading-[1.5rem] text-2xl md:text-3xl">
              ROCK <br /> PAPER <br /> SCISSORS
            </h1>
            <div className="bg-gray text-center py-2 px-5 rounded">
              <p className="text-score-text">Score</p>
              <h1 className=" font-bold text-dark-text text-4xl">{score}</h1>
            </div>
          </div>
        </div>
        {selected === null ? (
          <>
            <div className="relative md:w-[32rem] md:px-0 px-5 w-auto h-[16rem] md:min-h-[25rem] m-auto">
              <img
                alt="triagle"
                src="bg-triangle.png"
                className="absolute left-[50%] top-0 translate-x-[-50%] w-[70%]"
              />
              <div className="absolute top-[-3rem] md:top-[-5rem]">
                <GameItem
                  onClick={() => setSelected(0)}
                  bgColor="#2642bf"
                  color="from-[#4865f4] to-[#5671f5]"
                >
                  <ReactSVG src={IconPaper} />
                </GameItem>
              </div>
              <div className="absolute top-[-3rem] right-5 md:top-[-5rem] md:right-0">
                <GameItem
                  onClick={() => setSelected(1)}
                  bgColor="#c76b18"
                  color="from-[#ec9e0e] to-[#eca922]"
                >
                  <ReactSVG src={IconScissors} />
                </GameItem>
              </div>
              <div className="absolute bottom-0 left-[50%] translate-x-[-50%]">
                <GameItem
                  onClick={() => setSelected(2)}
                  bgColor="#9d1736"
                  color="from-[#dc2e4e] to-[#dd405d]"
                >
                  <ReactSVG src={IconRock} />
                </GameItem>
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-5 justify-between w-full relative px-10">
            {status !== "draw" && (
              <div
                className={`absolute ${
                  status === "win"
                    ? ""
                    : "md:right-[18.5rem] right-[10.5rem] top-0"
                }`}
              >
                <div className="w-[10rem] md:w-[20rem] absolute left-[-1rem] top-[1.5rem] md:top-0 md:left-[-2rem] rounded-full h-[10rem] md:h-[20rem] bg-[#ffffff0f]"></div>
                <div className="w-[11.5rem] md:w-[23rem] absolute left-[-1.8rem] top-[0.8rem] md:left-[-3.5rem] md:top-[-1.5rem] rounded-full h-[11.5rem] md:h-[23rem] bg-[#ffffff0f]"></div>
                <div className="w-[13rem] md:w-[26rem] absolute left-[-2.5rem] top-[0.5] md:left-[-5rem] md:top-[-3rem] rounded-full h-[13rem] md:h-[26rem] bg-[#ffffff0f]"></div>
              </div>
            )}
            <div className="text-center">
              <p className="mb-4">YOU PICKED</p>
              <GameItem
                size="large"
                bgColor="#c76b18"
                color="from-[#ec9e0e] to-[#eca922]"
              >
                <ReactSVG src={itemIcon[selected]} />
              </GameItem>
            </div>
            <div className="text-center">
              <p className="mb-4">THE HOUSE PICKED</p>
              <GameItem
                size="large"
                bgColor="#c76b18"
                color="from-[#ec9e0e] to-[#eca922]"
              >
                <ReactSVG src={itemIcon[computerSelect]} />
              </GameItem>
            </div>
            <div className="space-y-4 absolute left-[50%] md:top-[50%] md:translate-y-[-50%] md:mt-0 bottom-[-10rem] md:bottom-0 translate-x-[-50%] w-auto">
              <h1 className="text-center text-gray text-5xl md:text-6xl uppercase">
                {status === "draw" ? "DRAW" : `YOU ${status}`}
              </h1>
              <button
                onClick={() => {
                  setSelected(null);
                  setComputerSelect(null);
                }}
                className="text-dark-text bg-gray rounded text-center md:text-3xl w-full px-10 py-2"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>
      <button className="border-2 hover:bg-outline fixed md:bottom-20 md:right-20 bottom-10 right-5 px-6 py-2 rounded border-outline text-gray">
        RULES
      </button>
    </div>
  );
}

export default App;
