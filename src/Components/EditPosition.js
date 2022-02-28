import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditPosition({ list, id, setList, show, setShow }) {
  const [coData, setCoData] = React.useState({
    name: list[id].name,
    x: list[id].x,
    y: list[id].y,
    fontSize: list[id].fontSize ? list[id].fontSize : null,
    fontWeight: list[id].fontWeight ? list[id].fontWeight : null,
  });

  const handleSave = () => {
    let temp = { ...list };
    temp[id] = { ...coData };
    setList({ ...temp });
    setShow(false);
  };

  const handleChange = (e) => {
    setCoData({ ...coData, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <DialogTitle>Edit Label</DialogTitle>
          <TextField
            autoFocus
            id="name"
            label="Text"
            type="text"
            onChange={handleChange}
            defaultValue={list[id].name}
            style={{ margin: "10px 0" }}
          />
          <TextField
            id="x"
            label="X"
            type="text"
            onChange={handleChange}
            defaultValue={list[id].x}
            style={{ margin: "10px 0" }}
          />
          <TextField
            id="y"
            label="Y"
            type="text"
            onChange={handleChange}
            defaultValue={list[id].y}
            style={{ margin: "10px 0" }}
          />
          <TextField
            id="fontSize"
            label="fontSize"
            type="text"
            onChange={handleChange}
            defaultValue={list[id].fontSize}
            style={{ margin: "10px 0" }}
          />
          <TextField
            id="fontWeight"
            label="fontWeight"
            type="text"
            onChange={handleChange}
            defaultValue={list[id].fontWeight}
            style={{ margin: "10px 0" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} variant="contained" className="btn_save">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
