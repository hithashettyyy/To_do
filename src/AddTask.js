import React from 'react'
import "./AddTask.css"

function AddTask(props) {
  return (
    <>
       <input className="add-task-input" type="text" placeholder="Enter a new task......" value={props.currentInput} onChange={props.handleInput}></input>
       <button className="add" onClick={props.handleClick}>Add</button>
    </>
  )
}

export default AddTask