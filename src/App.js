import "./App.css";
import tasks from "./tasks.json";
import AddTask from "./AddTask.js";
import SearchBar from "./SearchBar.js";
import { useState } from "react";

function App() {
  //creating filtered lists for active and completed tasks
  const filterActive = (task) => {
    if (task.completed == false) return task;
  };
  const filterCompleted = (task) => {
    if (task.completed == true) return task;
  };

  const active = tasks.filter(filterActive);
  const completed = tasks.filter(filterCompleted);

  //state declarations
  const [currentInput, setCurrentInput] = useState("");
  const [activeTasksList, setActiveTasksList] = useState(active);
  const [allTasksList, setAllTasksList] = useState(tasks);
  const [completedTasksList, setCompletedTasksList] = useState(completed);
  const [displayActiveTasks, setActiveTasks] = useState(true);
  const [displayCompletedTasks, setCompletedTasks] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [matchedItems,setMatchedItems] = useState([]);
  const [displayMatchedItems,setDisplayMatchedItems] = useState(false);
  

  //event listeners for the buttons and input
  const activeTasksButton = () => {
    setActiveTasks((prev) => !prev);
    setCompletedTasks(false);
  };

  const completedTasksButton = () => {
    setCompletedTasks((prev) => !prev);
    setActiveTasks(false);
  };

  const addButton = () => {
    const newTaskTitle = currentInput;
    if (newTaskTitle !== "") {
      const newTask = {
        title: newTaskTitle,
        completed: false,
      };
      setActiveTasksList([...activeTasksList, newTask]);
      setCurrentInput("");
    }
  };

  //when user enters into input to add a task
  const enterInput = (e) => {
    setCurrentInput(e.target.value);
    console.log(currentInput);
  };

  const filterCheckedTasks = (task, taskToMove) => {
    return task.title !== taskToMove;
  };


  //when user clicks on the checkbox
  const handleCheckBox = (title) => {
    let taskToMove = title;
    const updatedActiveList = activeTasksList.filter((task) =>
      filterCheckedTasks(task, taskToMove)
    );
    setActiveTasksList(updatedActiveList);
    setMatchedItems([])
    
    setCompletedTasksList([
      ...completedTasksList,
      { title: taskToMove, completed: true },
    ]);
  
  };

  //event listeners for search
  const onSearch = (e)=>{
    setSearchValue(e.target.value);
  }

  //to filter out the search item
  const searchItems = (task, value) => {
    return task.title.toLowerCase() === (value.toLowerCase());
  };

  const handleSearchButton = () => {
    const value = searchValue.trim();
    if (value !== "") {
      const matchedItemsList = allTasksList.filter((task) =>
        searchItems(task, value)
      );
      setMatchedItems(matchedItemsList);
      setDisplayMatchedItems(true);
    } else {
      setDisplayMatchedItems(false);
    }
    setActiveTasks(false);
    setCompletedTasks(false);

    setSearchValue("")
  };

  return (
    <>
      <h1 className="header">To do list maker</h1>

      <AddTask
        handleInput={enterInput}
        handleClick={addButton}
        currentInput={currentInput}
      />

      <SearchBar
       searchVal={searchValue} 
       onSearch={onSearch} 
       handleSearchButton = {handleSearchButton}
      />

      <div>
        <div class="buttons">
          <button className="active-tasks-button" onClick={activeTasksButton}>
            Active Tasks
          </button>
          <button
            className="completed-tasks-button"
            onClick={completedTasksButton}
          >
            Completed Tasks
          </button>
        </div>

        {displayActiveTasks &&
          activeTasksList.map((task) => {
            return (
              <div className="individual_tasks">
                <input
                  type="checkbox"
                  onClick={() => handleCheckBox(task.title)}
                  checked={task.completed}
                  className="checkbox"
                ></input>
                <div className="task-name" key={task.id}>
                  {task.title}
                </div>
              </div>
            );
          })}

        {displayCompletedTasks &&
          completedTasksList.map((task) => {
            return (
              <div className="individual_tasks">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                ></input>
                <div className="task-name" key={task.id}>
                  {task.title}
                </div>
              </div>
            );
          })}

        {displayMatchedItems && matchedItems.map((task)=>{
           return(
            <div className="individual_tasks">
              <input
                  onClick={() => handleCheckBox(task.title)}
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                ></input>
            <div className="task-name" key={task.id}>
              {task.title}
            </div>
          </div>
           )
        })}



      </div>
    </>
  );
}

export default App;
