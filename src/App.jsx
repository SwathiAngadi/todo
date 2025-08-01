import { Fragment, useState } from "react";

import "./App.css";
let nextId = 0;

function App() {
  const [task, setTask] = useState([]);
  const [addedTask, setAddedTask] = useState([]);  

  function handleAddTask(task) {
    setTask((prev) => [
      ...prev,{ 
        id: nextId++,
        title: task,
        isEditing: false
      }
    ]);
  }

  function handleEditChange(Id){   
   setTask(task.map(t=>{
    if(t.id===Id){
      return (
        {...t,
          isEditing: true}
      )
    }
     else return t;
    }))    
  }

  function handleSaveChange(id){
    setTask(task.map(t=>{
      if(t.id=== id){
        return (
          {
            ...t,
            isEditing: false
          }
        )
      }else{
        return t;
      }
    }))
  }

  function handleDelete(Id){
    setTask(task.filter(t=> t.id!== Id));
  }

  function handleOnChange(e, id){
    var val = e.target.value;
    setTask(task.map(t=>{
      if(t.id===id){
        return ({
          ...t,
          title: val
        })
      }else{
        return t;
      }
    }));
  }
  const displayTask = task.map((t) => {
        return (
        t.isEditing?
        <>
         <input type="checkbox"/>
         <input  type="text"  name= "newVal" defaultValue={t.title} onChange={(e)=>handleOnChange(e, t.id)}/>
         <button className="save" onClick={()=>handleSaveChange(t.id)}> Save</button>
         <button className="delete" onClick={()=> handleDelete(t.id)}>Delete</button>
        </>
        :
        <li key={t.id} id={t.id}>
          <input type="checkbox"/>          
          {t.title}
          <button className="edit" onClick={()=>handleEditChange(t.id)}> Edit</button>
          <button className="delete" onClick={()=> handleDelete(t.id)}>Delete</button>
        </li>
        )
    });


  return (
    <>
      <h2> Todo List of learning</h2>

      {/* Add Section */}
      <div className="addSection">
        <input
          type="text"
          name="task"
          className="inputClass"
          value={addedTask}
          onChange={(e) => setAddedTask(e.target.value)}
        />
        <button className="add" onClick={() => handleAddTask(addedTask)}>
          Add Task
        </button>
      </div>
      {/* Display Section */}
      <div className="displayTask"><ul>{displayTask}</ul></div>
    </>
  );
}

export default App;
