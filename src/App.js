import "./App.css";
import Home from "./Home.js"
import AddTask from "./AddTask.js";
import { useState } from "react";
import {Route,Routes} from "react-router-dom"
import {Link} from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios'

function App() {

  const [allTasksList, setAllTasksList] = useState([]);
  const [activeTasksList, setActiveTasksList] = useState([]);
  const [completedTasksList, setCompletedTasksList] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [matchedItems,setMatchedItems] = useState([]);
  const [displayList,setDisplayList] = useState("active");
  const [taskAdded,setTaskAdded] = useState(false);

  useEffect(()=>{
      axios.get('https://jsonplaceholder.typicode.com/todos')
         .then(res=>{
             setAllTasksList(res.data)
         })
         .catch(err=>{
            console.log(err)
         })

  },[])

  useEffect(()=>{
      setActiveTasksList(allTasksList.filter(task=>!task.completed)) 
      setCompletedTasksList(allTasksList.filter(task=>task.completed))
  },[allTasksList])

  //event listeners for the buttons and input
  const activeTasksButton = () => {
    setDisplayList("active");
    
  };

  const completedTasksButton = () => {
     setDisplayList("completed");
  };

  const addButton = () => {
    const newTaskTitle = currentInput;
    if (newTaskTitle !== "") {
      const newTask = {
        userId: activeTasksList.length,
        id : activeTasksList.length,
        title: newTaskTitle,
        completed: false,
      }
      const newTask2 = {
        userId : allTasksList.length,
        id : allTasksList.length,
        title: newTaskTitle,
        completed: false,
      }
      setActiveTasksList([...activeTasksList, newTask]);
      setAllTasksList([...allTasksList,newTask2])
      setCurrentInput("");
      setDisplayList("active");
      setTaskAdded(true);
    }
      
  };

  const closeButton = () => {
      setTaskAdded(false);
  }

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
    
    setCompletedTasksList([
      ...completedTasksList,
      { title: taskToMove, completed: true },
    ]);
    setDisplayList("active");
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
      setSearchValue("");
      setMatchedItems(matchedItemsList);
      console.log(matchedItems);
      setDisplayList("matched");
    }
  };

 

  return (
    <>

    <nav>
      <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/add">Add Task</Link>
        </li>
      </ul>
    </nav>

    <Routes>
      <Route path="/" 
             element = {<Home
              currentInput = {currentInput}
              searchValue = {searchValue}
              allTasksList = {allTasksList}
              activeTasksList = {activeTasksList}
              completedTasksList = {completedTasksList}
              matchedItems = {matchedItems}
              displayList = {displayList}
              addButton = {addButton}
              enterInput = {enterInput}
              filterCheckedTasks = {filterCheckedTasks}
              handleCheckBox = {handleCheckBox}
              onSearch = {onSearch}
              searchItems = {searchItems}
              handleSearchButton = {handleSearchButton}
              activeTasksButton = {activeTasksButton}
              completedTasksButton = {completedTasksButton}
      />}
      />
      <Route path="/add" 
             element = {<AddTask handleInput = {enterInput}
                                 handleClick={addButton}
                                 currentInput={currentInput}    
                                 taskAdded = {taskAdded}
                                 closeButton = {closeButton}
                       />}
      />
    </Routes>

      
    </>
  );
}

export default App;







// import "./App.css";
// import tasks from "./tasks.json";
// import Home from "./Home.js"
// import AddTask from "./AddTask.js";
// import { useState } from "react";
// import {Route,Routes} from "react-router-dom"
// import {Link} from "react-router-dom";

// function App() {

//   //creating filtered lists for active and completed tasks
//   const filterActive = (task) => {
//     if (task.completed == false) return task;
//   };
//   const filterCompleted = (task) => {
//     if (task.completed == true) return task;
//   };

//   const active = tasks.filter(filterActive);
//   const completed = tasks.filter(filterCompleted);

//   //state declarations
//   const [currentInput, setCurrentInput] = useState("");
//   const [searchValue, setSearchValue] = useState("");

//   const [allTasksList, setAllTasksList] = useState(tasks);
//   const [activeTasksList, setActiveTasksList] = useState(active);
//   const [completedTasksList, setCompletedTasksList] = useState(completed);
//   const [matchedItems,setMatchedItems] = useState([]);
  
//   const [displayList,setDisplayList] = useState("active");
//   const [taskAdded,setTaskAdded] = useState(false);

//   //event listeners for the buttons and input
//   const activeTasksButton = () => {
//     setDisplayList("active");
    
//   };

//   const completedTasksButton = () => {
//      setDisplayList("completed");
//   };

//   const addButton = () => {
//     const newTaskTitle = currentInput;
//     if (newTaskTitle !== "") {
//       const newTask = {
//         title: newTaskTitle,
//         completed: false,
//       };
//       setAllTasksList([...allTasksList],newTask);
//       setActiveTasksList([...activeTasksList, newTask]);
//       setCurrentInput("");
//       setDisplayList("active");
//       setTaskAdded(true);
//     }
//   };

//   const closeButton = () => {
//       setTaskAdded(false);
//   }

//   //when user enters into input to add a task
//   const enterInput = (e) => {
//     setCurrentInput(e.target.value);
//     console.log(currentInput);
//   };

//   const filterCheckedTasks = (task, taskToMove) => {
//     return task.title !== taskToMove;
//   };


//   //when user clicks on the checkbox
//   const handleCheckBox = (title) => {
//     let taskToMove = title;
//     const updatedActiveList = activeTasksList.filter((task) =>
//       filterCheckedTasks(task, taskToMove)
//     );
//     setActiveTasksList(updatedActiveList);
    
//     setCompletedTasksList([
//       ...completedTasksList,
//       { title: taskToMove, completed: true },
//     ]);
//     setDisplayList("active");
//   };

//   //event listeners for search
//   const onSearch = (e)=>{
//     setSearchValue(e.target.value);
//   }

//    //to filter out the search item
//   const searchItems = (task, value) => {
//     return task.title.toLowerCase() === (value.toLowerCase());
//   };

//   const handleSearchButton = () => {
//     const value = searchValue.trim();
//     if (value !== "") {
//       const matchedItemsList = allTasksList.filter((task) =>
//         searchItems(task, value)
//       );
//       setSearchValue("");
//       setMatchedItems(matchedItemsList);
//       console.log(matchedItems);
//       setDisplayList("matched");
//     }
//   };

 

//   return (
//     <>

//     <nav>
//       <ul>
//         <li>
//             <Link to="/">Home</Link>
//         </li>
//         <li>
//             <Link to="/add">Add Task</Link>
//         </li>
//       </ul>
//     </nav>

//     <Routes>
//       <Route path="/" 
//              element = {<Home
//               currentInput = {currentInput}
//               searchValue = {searchValue}
//               allTasksList = {allTasksList}
//               activeTasksList = {activeTasksList}
//               completedTasksList = {completedTasksList}
//               matchedItems = {matchedItems}
//               displayList = {displayList}
//               addButton = {addButton}
//               enterInput = {enterInput}
//               filterCheckedTasks = {filterCheckedTasks}
//               handleCheckBox = {handleCheckBox}
//               onSearch = {onSearch}
//               searchItems = {searchItems}
//               handleSearchButton = {handleSearchButton}
//               activeTasksButton = {activeTasksButton}
//               completedTasksButton = {completedTasksButton}
//       />}
//       />
//       <Route path="/add" 
//              element = {<AddTask handleInput = {enterInput}
//                                  handleClick={addButton}
//                                  currentInput={currentInput}    
//                                  taskAdded = {taskAdded}
//                                  closeButton = {closeButton}
//                        />}
//       />
//     </Routes>

      
//     </>
//   );
// }

// export default App;





