import React, { useCallback, useEffect, useState } from "react";
import Snake from "./Snake";
import Food from "./Food";
import Time from "./Time";
import DisplayTime from "./DisplayTime";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 90;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const SneakGame = () => {
  const [food, setFood] = useState(getRandomCoordinates);
  const [speed, setSpeed] = useState(200);
  const [direction, setDirection] = useState("RIGHT");
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0]
  ]);
  const [pause, setPause] = useState(true);
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (pause) return;
    checkIfOutOfBorders();
    checkIfCollapsed();
    setTimeout(() => moveSnake(snakeDots, checkIfEat()), speed);
  }, [snakeDots, pause]);

  useEffect(() => {
    // document.onkeydown = onKeyDown;
    const onKeyDown = (e) => {
      e = e || window.event;
      switch (e.keyCode) {
        case 38:
          !["DOWN", "UP"].includes(direction) && setDirection("UP");
          break;
        case 40:
          !["DOWN", "UP"].includes(direction) && setDirection("DOWN");
          break;
        case 37:
          !["LEFT", "RIGHT"].includes(direction) && setDirection("LEFT");
          break;
        case 39:
          !["LEFT", "RIGHT"].includes(direction) && setDirection("RIGHT");
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [direction, setDirection]);

  useEffect(() => {
    if (snakeDots.length > 7 && snakeDots.length < 15) {
      setSpeed(150);
    } else if (snakeDots.length > 16 && snakeDots.length < 22) {
      setSpeed(100);
    } else if (snakeDots.length > 22 && snakeDots.length < 32) {
      setSpeed(75);
    } else if (snakeDots.length > 32) {
      setSpeed(50);
    }
  }, [snakeDots]);

  const moveSnake = useCallback(
    (snakeDots, eaten) => {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];

      switch (direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;

        default:
          break;
      }
      if (direction) {
        dots.push(head);

        eaten ? setFood(getRandomCoordinates()) : dots.shift();

        setSnakeDots([...dots]);
      }
    },
    [direction]
  );

  const checkIfOutOfBorders = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  };

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];

    return head[0] === food[0] && head[1] === food[1];
  };

  const onGameOver = () => {
    setSnakeDots([
      [0, 0],
      [2, 0]
    ]);
    setDirection(null);
    window.location.reload();
  };

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  let updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }

    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }

    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  return (
    <>
      <div className="score">
        {" "}
        <h3>Score: </h3>
        <span className="score-span"> {snakeDots.length - 2}</span>
      </div>

      <div className="clock-holder">
        <div>
          <Time time={time} />
        </div>
      </div>

      <div className="game-area">
        <Snake snakeDots={snakeDots} />
        <Food dot={food} />
      </div>

      <div className="btn">
        <button
          onClick={() => {
            setPause((p) => !p);
            if (pause) {
              start();
            } else {
              stop();
            }
          }}
        >
          {pause ? "PLAY" : "PAUSE"}
        </button>
      </div>
    </>
  );
};

export default SneakGame;
