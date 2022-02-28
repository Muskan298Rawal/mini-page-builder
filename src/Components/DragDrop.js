import React, { useEffect, useState } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "../App.css";
import { Grid } from "@mui/material";
import EditPosition from "./EditPosition";
import Draggable from 'react-draggable';

const InputList = [
  {
    id: 1,
    name: "Label",
  },
  {
    id: 2,
    name: "Input",
  },
  {
    id: 3,
    name: "Button",
  },
];

function DragDrop() {
  const [board, setBoard] = useState([]);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [list, setList] = useState({});
  const [itemId, setItemId] = useState(null);
  const [uid, setUid] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // console.log("nndn",document.getElementById("axis").getBoundingClientRect())
    if (itemId) addImageToBoard(itemId);
  }, [position]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "input",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      let obj = { x: offset.x, y: offset.y };
      setItemId(item.id);
      setPosition((prev) => ({ ...prev, ...obj }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const InputLists = InputList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, InputLists[0]]);
    let temp = { ...list };
    let uid = Math.random();
    let obj = {
      [uid]: { name: InputLists[0].name, x: position.x, y: position.y },
    };

    let obj_temp = { ...temp, ...obj };
    if (Object.keys(obj).length > 0) {
      setList({ ...obj_temp });
    }
    setShow(true);
    setUid(uid);
  };

  const handleClick = (id) => {
    setShow(true);
    setUid(id);
  };

  const handleDrag = (e, ui ) => {
    let temp={...list}
    temp[uid].x +=  ui.deltaX
    temp[uid].y +=  ui.deltaY
    setList({...temp})
  }

  const keys_id = Object.keys(list);
  
  return (
    <Grid container>
      <Grid item xs={9} className="leftSide" ref={drop}>
        {keys_id.length > 0 &&
          keys_id.map((b, idx) => {
            let temp = list[b];
            return (
              <>
                <Draggable onDrag={handleDrag}>
                  <p
                   id="axis"
                    key={idx}
                    style={{
                      position: "absolute",
                      top: temp.y,
                      left: temp.x,
                      fontSize: temp.fontSize && temp.fontSize + "px",
                      fontWeight: temp.fontWeight && temp.fontWeight,
                      border: show && uid == b && "1px solid red",
                    }}
                    onClick={() => handleClick(b)}
                  >
                    {temp.name}
                  </p>
                </Draggable>
                {uid == b && show && (
                  <EditPosition
                    show={show}
                    setShow={setShow}
                    list={list}
                    id={uid}
                    setList={setList}
                  />
                )}
              </>
            );
          })}
      </Grid>
      <Grid item xs={3} className="rightSide">
        <div className="blocks">BLOCKS</div>
        <div className="Board">
          {InputList.map((input, idx) => {
            return <Picture key={idx} name={input.name} id={input.id} />;
          })}
        </div>
      </Grid>
    </Grid>
  );
}

export default DragDrop;
