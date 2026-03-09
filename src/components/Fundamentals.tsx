import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

function Fundamentals() {
  //Variable Object
  const User = {
    firstname: "Sophal",
    lastname: "Saysuon",
    Age: 18,
    Gender: "Male",
  };

  // Hook In React JS
  //1. (useState) is storage or same action Variable (working object, array object), Usage: [value, function] = useState(value)

  //const [Name, setName] = useState("Saysuonsophal");
  const [Name, setName] = useState("Saysuonsophal");

  function changeName() {
    setName("Update Saysuon Sophal");
  }

  //spread operation
  const event = [1, 2, 3, 4];
  const odd = [5, 6, 7, 9];
  const upadteNumber = [...event, ...odd];
  return (
    <>
      <br />
      <h2 className="text-lg font-bold mb-5">
        <strong>spread operation(...) </strong> <br />
        Use Case( copy object/array,Merge arrays/objects, and Pass array to
        function)
      </h2>
      Array Event: {event}, Array Odd: {odd} <br />
      Result spread Operation: {upadteNumber}
      <br />
      <br />
      <h2 className="text-lg font-bold">Calling Variable Object in React JS</h2>
      <Badge className="bg-red-600">Discount 30%</Badge>
      <p>FirstName: {User.firstname}</p>
      <p>lastname: {User.lastname}</p>
      <p>Age: {User.Age}</p>
      <br />
      <h2 className="text-lg font-bold">
        <strong>(useState) </strong>Hook in React JS
      </h2>
      <p>useState Name:{Name}</p>
      <Button onClick={changeName}>Change Name</Button>
      <br />
      <br />
    </>
  );
}

export default Fundamentals;
