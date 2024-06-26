import React from 'react'
import "../Stylesheets/AddTask.css"


function AddTask(props) {

  return (
    <>
      <div className="add_container">
        <input className="add-task-input" type="text" placeholder="Enter a new task......" value={props.currentInput} onChange={props.handleInput}></input>
        <button className="add" onClick={props.handleClick}> Add </button>
        </div>

        <div className="message">
        {props.taskAdded && 
          <div className='message-container'>
           <button className='close' onClick={props.closeButton}>x</button>
           <p>New Task Added Successfully</p>
          </div>
        }
        </div>
        
    </>

  )
}

export default AddTask