import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex gap-2 justify-center">
      <Link to={"/"}>
        <Button>Home page</Button>
      </Link>
      <Link to={"/users"}>
        <Button>Users page</Button>
      </Link>
      <Link to={"/basic"}>
        <Button>Basic</Button>
      </Link>
      <Link to={"/dashboard"}>
        <Button>Dashboard Products</Button>
      </Link>
    </div>
  );
};
export default Home;
