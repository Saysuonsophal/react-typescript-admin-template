import { CountNumber } from "@/components/CountNumber";
import Fundamentals from "@/components/Fundamentals";
import UseEffect from "@/components/UseEffect";

function Basic() {
  return (
    <div className="flex flex-col items-center">
      <Fundamentals />
      <CountNumber />
      <UseEffect />
    </div>
  );
}

export default Basic;
