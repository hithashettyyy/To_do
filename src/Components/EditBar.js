import React from 'react'
import '../Stylesheets/SearchBar.css'
import { useSelector, useDispatch } from 'react-redux'
import { setEditValue } from '../redux/tasksActions'

function EditBar({handleEdit}) {
    
    const dispatch = useDispatch()
    const editValue = useSelector(state=>state.editValue)

  return (
    <div color="search_container">
      <input className="searchbar" type="text" placeholder="Edit Task..." 
             onChange = {(e)=>dispatch(setEditValue(e.target.value))}
             value={editValue}
      ></input>
      <button className="searchbtn" onClick={handleEdit}>Edit</button>
    </div>
  )
}

export default EditBar
