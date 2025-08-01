import { Fragment, useState } from "react";
import AddTask from './components/AddTask';

import "./App.css";
let nextId = 0;

function App() {
  const [task, setTask] = useState([]);

  function handleAddTask(task) {
    setTask((prev) => [
      ...prev,{ 
        id: nextId++,
        title: task,
        isEditing: false,
        isChecked: true
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
    var name= e.target.id;
    setTask(task.map(t=>{
      if(t.id===id){
        return ({
          ...t,
          name: val
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
         <input type="checkbox" checked={t.isChecked}  name="isChecked" onChange={(e)=>handleOnChange(e, t.id)}/>
         <input  type="text"  name= "newVal" defaultValue={t.title} onChange={(e)=>handleOnChange(e, t.id)}/>
         <button className="save" onClick={()=>handleSaveChange(t.id)}> Save</button>
         <button className="delete" onClick={()=> handleDelete(t.id)}>Delete</button>
        </>
        :
        <li key={t.id} id={t.id}>
          <input type="checkbox" checked={t.isChecked} name="isChecked" onChange={(e)=>handleOnCheck(e, t.id)}/>          
          {t.title}
          <button className="edit" onClick={()=>handleEditChange(t.id)}> Edit</button>
          <button className="delete" onClick={()=> handleDelete(t.id)}>Delete</button>
        </li>
        )
    });


  return (
    <>
      <h2> Todo List of learning</h2>

      <AddTask handleAddTask={handleAddTask}/>
      {/* Display Section */}
      <div className="displayTask"><ul>{displayTask}</ul></div>
    </>
  );
}

export default App;
