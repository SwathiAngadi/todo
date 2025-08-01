import { useState } from "react";

export default function AddTask(props) {
  const [addedTask, setAddedTask] = useState([]);

  return (
    <div className="addSection">
      <input
        type="text"
        name="title"
        className="inputClass"
        value={addedTask}
        onChange={(e) => setAddedTask(e.target.value)}
      />
      <button className="add" onClick={() => props.handleAddTask(addedTask)}>
        Add Task
      </button>
    </div>
  );
}
