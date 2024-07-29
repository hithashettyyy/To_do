import "./Stylesheets/App.css";
import Home from "./Components/Home.js"
import AddTask from "./Components/AddTask.js";
import { Route, Routes, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import axios from 'axios'

//redux 
import { useSelector, useDispatch } from "react-redux";
import {
  setAllTasksList,
  setCurrentInput,
  setSearchValue,
  setDisplayList,
  setMatchedItems,
  setTaskAdded,
  setEditView,
  setEditTask,
  setEditValue,
} from './redux/tasksActions.js'

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allTasksList = useSelector(state => state.allTasksList);
  const currentInput = useSelector(state => state.currentInput);
  const searchValue = useSelector(state => state.searchValue);
  const matchedItems = useSelector(state => state.matchedItems);
  const displayList = useSelector(state => state.displayList);
  const taskAdded = useSelector(state => state.taskAdded);
  const editView = useSelector(state=>state.editView)
  const editValue = useSelector(state=>state.editValue)
  const toEditTask = useSelector(state=>state.editTask)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        dispatch(setAllTasksList(res.data))
      })
      .catch(err => {
        console.log(err)
      })

  },[dispatch])

  //event listeners for the buttons and input
  const activeTasksButton = () => {
    dispatch(setDisplayList("active"))

  };

  const completedTasksButton = () => {
    dispatch(setDisplayList("completed"));
  };

  const addButton = () => {

    const newTaskTitle = currentInput;
    if (newTaskTitle !== "") {
      const newTask = {
        userId: allTasksList.length % 20,
        id: allTasksList.length+1,
        title: newTaskTitle,
        completed: false,
      }

      const newTaskAddedList = [newTask,...allTasksList]

      dispatch(setAllTasksList(newTaskAddedList))
      dispatch(setCurrentInput(""))
      dispatch(setDisplayList("active"))
      dispatch(setTaskAdded(true))
    }
  }

  const closeButton = () => {
    dispatch(setTaskAdded(false))
    navigate('/')

  }

  //when user enters into input to add a task
  const enterInput = (e) => {
    dispatch(setCurrentInput(e.target.value))
  }

  const filterCheckedTasks = (task, taskToMove) => {
    return task.title !== taskToMove
  }


  //when user clicks on the checkbox
  const handleCheckBox = (task) => {
    const updatedTasks = allTasksList.map(t => 
      t.id === task.id ? { ...t, completed: !t.completed } : t
    )
  
    dispatch(setAllTasksList(updatedTasks));
  }
  

  //event listeners for search
  const onSearch = (e) => {
    dispatch(setSearchValue(e.target.value))
  }

  //to filter out the search item
  const searchItems = (task, value) => {
    return task.title.toLowerCase() === (value.toLowerCase())
  }

  const handleSearchButton = () => {
    const value = searchValue.trim();
    if (value !== "") {
      const matchedItemsList = allTasksList.filter((task) =>
        searchItems(task, value)
      )
      dispatch(setSearchValue(""))
      dispatch(setMatchedItems(matchedItemsList))
      dispatch(setDisplayList("matched"))
    }
  }

  //to delete a task
  const handleDelete = (id)=>{
       const afterDelete = allTasksList.filter(task=>task.id!==id)
       dispatch(setAllTasksList(afterDelete))

       if(matchedItems.length>0){
         const afterDelete2 = matchedItems.filter(task=>task.id!==id)
         dispatch(setMatchedItems(afterDelete2))
       }
       
       dispatch(setDisplayList("active"))
  }

  const editTask = (task)=>{
       dispatch(setEditValue(task.title))
       dispatch(setEditView(!editView))
       dispatch(setEditTask(task))
  }

  const handleEdit = ()=>{
      const edited = allTasksList.map(task=>
         task.id===toEditTask.id ? {...task,title:editValue} : task
      )
      dispatch(setAllTasksList(edited))
      dispatch(setEditTask({}))
      dispatch(setEditValue(''))
      dispatch(setEditView(!editView))
  }


  return (
    <>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">AddTask</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/"
          element={<Home
            currentInput={currentInput}
            searchValue={searchValue}
            allTasksList={allTasksList}
            matchedItems={matchedItems}
            displayList={displayList}
            addButton={addButton}
            enterInput={enterInput}
            filterCheckedTasks={filterCheckedTasks}
            handleCheckBox={handleCheckBox}
            onSearch={onSearch}
            searchItems={searchItems}
            handleSearchButton={handleSearchButton}
            activeTasksButton={activeTasksButton}
            completedTasksButton={completedTasksButton}
            handleDelete={handleDelete}
            editTask={editTask}
            handleEdit = {handleEdit}
          />}
        />
        <Route path="/add"
          element={<AddTask handleInput={enterInput}
            handleClick={addButton}
            currentInput={currentInput}
            taskAdded={taskAdded}
            closeButton={closeButton}
          />}
        />
      </Routes>


    </>
  );
}

export default App;






