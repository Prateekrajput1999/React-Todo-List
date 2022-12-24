import React, { useState } from 'react'
import './App.css'
import InputComp from './Component/InputComp/InputComp'

const App = () => {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editKey,setEditKey] = useState('');


  function deleteTask(e) {
    e.preventDefault();

    setTasks(tasks.filter((task) => {
      return (task.key !== e.target.value);
    }))

    if(editKey===e.target.value) {
      setEditKey('');
      setText('');
    }
  }

  function doneTask(e) {
    e.preventDefault(); 

    setTasks(tasks.map((task)=> {
      if(task.key===e.target.value)
        return (task.done ? {...task, done:false} : {...task, done:true});
      return task;
    }))
    
    if(editKey===e.target.value) {
      setEditKey('');
      setText('');
    }

  }

  function checkDone(edit_key) {
    for(let i=0;i<tasks.length;i++) {
      if(tasks[i].key===edit_key && tasks[i].done) return true;
    }
    return false;
  }

  function handleEdit(e) {
    e.preventDefault();

    if(checkDone(e.target.name)) {
      window.alert("Un-Done the task first to Edit it");
      return;
    }

    if(editKey===e.target.name) {
      setEditKey('');
      setText('');
      return;
    }
    
    setEditKey(e.target.name);
    setText(e.target.value);
  }


  return (
    <div className='main-body'>
      <p className='nav'>TODO-APP</p>
      <InputComp text={text} setText={setText} tasks={tasks} setTasks={setTasks} editKey={editKey} setEditKey={setEditKey} />

      {tasks.length === 0 ? <h1 style={{ margin: "100px", color: "red" }}>NO TASKS YET</h1> :

        tasks.map((task) => {

          return (
            <div className='task-box'>
              <p className={`normal ${task.done ? "blurry" : ""}`}>{task.text}</p>
              <button id='edit-button' style={{ color: "blue" }} onClick={handleEdit} name={task.key} value={task.text} >{(editKey===task.key ? "Un-Edit" : "Edit")}</button>
              <button id='delete-button'style={{ color: "red" }}  onClick={deleteTask} value={task.key} >Delete</button>
              <button id='done-button' style={{ color: "green" }} onClick={doneTask} value={task.key} >{(task.done ? "Un-Done" : "Done")}</button>
            </div>
          
          )})
      }

    </div>
  )
}

export default App