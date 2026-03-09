import { useState } from "react";
import { Button } from "./ui/button";

function UseEffect() {
  const [count, setCount] = useState(0);
  //const [round, setround] = useState("First Round");
  //handleDecrease
  //   useEffect(() => {
  //     if (count === 5) {
  //       setround("Second Round");
  //     } else {
  //       setround("First Round");
  //     }
  //   }, [count]);

  //handleIncrease
  const round = count >= 5 ? "Second Round" : "First Round";

  return (
    <div>
      <br />
      <br />
      <h2 className="text-lg font-bold">
        <strong>(useEffect) </strong>Hook in React JS
      </h2>
      <br />
      <p>
        <span className="font-bold">{round}</span> Counter Number :{count}
      </p>
      <Button
        className="mr-2 cursor-pointer"
        onClick={() => {
          const Result = setCount(count + 1);
          console.log("counter", count);
          return Result;
        }}
      >
        +
      </Button>
      <Button onClick={() => setCount(count ? count - 1 : 0)}>-</Button>
    </div>
  );
}

export default UseEffect;
