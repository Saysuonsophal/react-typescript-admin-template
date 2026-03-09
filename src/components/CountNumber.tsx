import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";

export const CountNumber = () => {
  const [count, setCount] = useState(0);
  const [round, setround] = useState("First Round");
  const [Random, setRandom] = useState<number[]>([]);

  function handleDecrease() {
    let updateCount = count;
    updateCount += 1;
    setCount(updateCount);
    if (updateCount === 10) {
      setround("Second Round");
    }
  }
  return (
    <>
      <p>
        <span className="font-bold">{round}</span> Counter Number :{count}
      </p>
      <Button onClick={handleDecrease} className="mr-2 cursor-pointer">
        +
      </Button>
      <Button
        className="mr-2 cursor-pointer"
        onClick={() => {
          const minusCount = count ? count - 1 : 0;

          setCount(minusCount);
          if (minusCount < 10) {
            setround("First Round");
          }
        }}
      >
        -
      </Button>
      <br />
      <br />

      <h2 className="text-lg font-bold">Array Random Number</h2>
      {/* <ul>
        {Random.map((number, index) => {
          return <li key={index}>{number}</li>;
        })}
      </ul> */}
      <ol>
        {Random.map((number, index) => (
          <li>
            <span>key{index}: </span>
            {number}
          </li>
        ))}
      </ol>
      {/* Two write way of Arrow function in React */}
      {/* <Button
        onClick={() =>
          setRandom((currentNumber) => {
            return [...currentNumber, Math.random()];
          })
        }
      >
        Random Number with return
      </Button> */}
      <Button
        onClick={() => {
          setRandom((currenNumber) => [...currenNumber, Math.random()]);
        }}
      >
        Redom Number with no return
      </Button>
    </>
  );
};
