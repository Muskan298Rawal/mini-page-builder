import React from "react";
import { useDrag } from "react-dnd";

function Picture({ id, name }) {
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      className="input"
      id ={id} ref={drag}
    >
      <img src="/grip-vertical.png" className="img_" />
      {name}
    </div>
  );
}

export default Picture;
