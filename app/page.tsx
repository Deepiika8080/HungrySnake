"use client"
import "../css/style.css";
import { useEffect, useRef } from "react";
import IsCollide from "./components/IsCollide";

export default function Home() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const inputDir = useRef({ x: 0, y: 0 });
  const scoreRef = useRef<HTMLDivElement | null>(null);
  const highScoreRef = useRef<HTMLDivElement | null>(null);

  const foodSound: HTMLAudioElement | undefined = new Audio("/music/food.mp3");
  const gameOverSound: HTMLAudioElement | undefined = new Audio("/music/game-over.mp3");
  const gamemusic: HTMLAudioElement | undefined = new Audio("/music/music.mp3");
  const movesound: HTMLAudioElement | undefined = new Audio("/music/move.mp3");

  const speed = 7;
  let lastPaintTime = 0;
  let snakeArr = [
    { x: 13, y: 15 }
  ]
  let food = { x: 6, y: 12 };
  let score = 0;
  const highScore = localStorage.getItem("hiscore");
  console.log("highScore", highScore);
  let highScoreValue = highScore ? parseInt(highScore, 10) : 0;
  console.log("hhighScoreValueighScore", highScoreValue);
  
  // function isCollide(sarr: { x: number; y: number }[]) {
  //   for (let i = 1; i < snakeArr.length; i++) {
  //     if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
  //       return true;
  //     }

  //   }
  //   if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
  //     return true;
  //   }
  // }
 <IsCollide snakeArr={snakeArr}/>
  function gameEngine() {
    // updating snake and food 

    if (IsCollide(snakeArr)) {
      gameOverSound?.play();
      gamemusic?.pause();

      if (highScoreValue) {
        if (highScoreValue < score) {
          highScoreValue = score;
          console.log("highScoreValue", highScoreValue);
          console.log("score", score);
          if (highScoreRef.current) {
            highScoreRef.current.innerHTML = "High Score : " + highScoreValue;//highScore
          }
        }
      }


      inputDir.current = { x: 0, y: 0 };
      food = { x: 6, y: 12 };
      score = 0;
      if (scoreRef.current) {
        scoreRef.current.innerHTML = "score : " + score;
      }

      alert("Game over! Press any key to restart.");
      snakeArr = [{ x: 13, y: 15 }]
      gamemusic?.play();

    }

    // if snake eaten the food you need to add new food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
      foodSound?.play();
      score += 1;
      // if( scoreRef.current) {
      //   if( scoreRef.current > highScore) {
      //     highScore = scoreRef.current;
      //     localStorage.setItem("hiscore",JSON.stringify(highScore));
      //   }
      // }
      if (score > highScoreValue) {
        highScoreValue = score;
        localStorage.setItem("hiscore", JSON.stringify(highScoreValue));
      }
      if (scoreRef.current) {
        scoreRef.current.innerHTML = "score : " + score;
      }

      snakeArr.unshift({ x: snakeArr[0].x + inputDir.current.x, y: snakeArr[0].y + inputDir.current.y })
      const a = 0, b = 18;
      food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // Moving the sanke 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
      snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.current.x;
    snakeArr[0].y += inputDir.current.y;
    // displays snake and food
    // displays snake
    if (boardRef.current) {
      boardRef.current.innerHTML = "";
    }
    snakeArr.forEach((e, index) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = e.y.toString();
      snakeElement.style.gridColumnStart = e.x.toString();

      if (index === 0) {
        snakeElement.classList.add('head');
      } else {
        snakeElement.classList.add('snake');
      }

      boardRef.current?.appendChild(snakeElement);

    })
    // displays food

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y.toString();
    foodElement.style.gridColumnStart = food.x.toString();
    foodElement.classList.add('food');
    boardRef.current?.appendChild(foodElement);
  }

  function main(ctime: number) {

    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
    lastPaintTime = ctime;

    gameEngine();
  }

  
 
  useEffect(
    () => {
      if (highScoreValue === null) {
        const highScoreval = 0;
        localStorage.setItem("hiscore", JSON.stringify(highScoreval));
      } else {
        console.log("highScoreRef", highScoreRef.current);
        if (highScoreRef.current !== null) {
          console.log("inner highscore", highScoreValue);
          highScoreRef.current.innerHTML = "High Score : " + highScoreValue;
        }    
      }
    }, []
  )
  useEffect(() => {

    window.requestAnimationFrame(main);
    // Main logic
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      gamemusic.play();
      inputDir.current = { x: 0, y: 1 }
      movesound.play();

      switch (e.key) {
        case "ArrowUp":
          inputDir.current.y = -1;
          inputDir.current.x = 0;
          // console.log("ArrowUP");
          break;

        case "ArrowDown":
          inputDir.current.y = 1;
          inputDir.current.x = 0;
          // console.log("ArrowDOWN");
          break;

        case "ArrowLeft":
          inputDir.current.y = 0;
          inputDir.current.x = -1;
          // console.log("ArrowLEFT");
          break;

        case "ArrowRight":
          inputDir.current.y = 0;
          inputDir.current.x = 1;
          // console.log("ArrowRIGHT");
          break;

        default:
          break;
      }
    });
  }, [gamemusic  , movesound]);
  // Game logic

  // Game functions 

  return (
    <div>
      <div className="board " ref={boardRef}></div>
      <div id="score" ref={scoreRef}>score:0</div>
      <div id="highscore" ref={highScoreRef}> HighScore:0</div>
    </div>
  );
}

