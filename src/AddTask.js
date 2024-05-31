import React from 'react'
import "./AddTask.css"

function AddTask(props) {
  return (
    <div className="add_container">
       <input className="add-task-input" type="text" placeholder="Enter a new task......" value={props.currentInput} onChange={props.handleInput}></input>
       <button className="add" onClick={props.handleClick}>Add</button>
    </div>
  )
}

export default AddTask