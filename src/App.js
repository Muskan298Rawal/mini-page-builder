import { Grid } from "@mui/material";
import "./App.css";
import DragDrop from "./Components/DragDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  // const onDragStart = (e, name) => {
  //   ev.dataTransfer.setData("id", name);
  // }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <DragDrop />
      </div>
    </DndProvider>
  );
}

export default App;
