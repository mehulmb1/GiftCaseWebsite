
"use client";

import { Carousel } from "flowbite-react";

function UncontrolledExample() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src="src\assets\home\1.jpg" alt="..." />
        <img src="src\assets\home\2.jpg" alt="..." />
      </Carousel>
    </div>
    
  );
}

export default UncontrolledExample;
