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
  setTaskAdded
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






// import "./Stylesheets/App.css";
// import Home from "./Components/Home.js"
// import AddTask from "./Components/AddTask.js";
// import { Route, Routes, useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
// import axios from 'axios'

// //redux 
// import { useSelector, useDispatch } from "react-redux";
// import {
//   setAllTasksList,
//   setActiveTasksList,
//   setCompletedTasksList,
//   setCurrentInput,
//   setSearchValue,
//   setDisplayList,
//   setMatchedItems,
//   setTaskAdded
// } from './redux/tasksActions.js'

// function App() {

//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const allTasksList = useSelector(state => state.allTasksList);
//   const activeTasksList = useSelector(state => state.activeTasksList);
//   const completedTasksList = useSelector(state => state.completedTasksList);
//   const currentInput = useSelector(state => state.currentInput);
//   const searchValue = useSelector(state => state.searchValue);
//   const matchedItems = useSelector(state => state.matchedItems);
//   const displayList = useSelector(state => state.displayList);
//   const taskAdded = useSelector(state => state.taskAdded);

//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/todos')
//       .then(res => {
//         dispatch(setAllTasksList(res.data))
//       })
//       .catch(err => {
//         console.log(err)
//       })

//   }, [dispatch])

//   useEffect(() => {
//     dispatch(setActiveTasksList(allTasksList.filter(task => !task.completed)))
//     dispatch(setCompletedTasksList(allTasksList.filter(task => task.completed)))
//   }, [allTasksList, dispatch])

//   //event listeners for the buttons and input
//   const activeTasksButton = () => {
//     dispatch(setDisplayList("active"))

//   };

//   const completedTasksButton = () => {
//     dispatch(setDisplayList("completed"));
//   };

//   const addButton = () => {

//     const newTaskTitle = currentInput;
//     if (newTaskTitle !== "") {
//       const newTask = {
//         userId: activeTasksList.length % 20,
//         id: activeTasksList.length,
//         title: newTaskTitle,
//         completed: false,
//       }
//       const newTask2 = {
//         userId: allTasksList.length % 20,
//         id: allTasksList.length,
//         title: newTaskTitle,
//         completed: false,
//       }

//       dispatch(setAllTasksList([newTask2,...allTasksList]))
//       dispatch(setActiveTasksList([newTask,...activeTasksList]))
//       dispatch(setCurrentInput(""))
//       dispatch(setDisplayList("active"))
//       dispatch(setTaskAdded(true))
//     }
//   }

//   const closeButton = () => {
//     dispatch(setTaskAdded(false))
//     navigate('/')

//   }

//   //when user enters into input to add a task
//   const enterInput = (e) => {
//     dispatch(setCurrentInput(e.target.value))
//   }

//   const filterCheckedTasks = (task, taskToMove) => {
//     return task.title !== taskToMove
//   }


//   //when user clicks on the checkbox
//   const handleCheckBox = (title) => {
//     let taskToMove = title;
//     const updatedActiveList = activeTasksList.filter((task) =>
//       filterCheckedTasks(task, taskToMove)
//     )
//     dispatch(setActiveTasksList(updatedActiveList))

//     dispatch(setCompletedTasksList([
//       ...completedTasksList,
//       { title: taskToMove, completed: true },
//     ]))
//     dispatch(setDisplayList("active"))
//   }

//   //event listeners for search
//   const onSearch = (e) => {
//     dispatch(setSearchValue(e.target.value))
//   }

//   //to filter out the search item
//   const searchItems = (task, value) => {
//     return task.title.toLowerCase() === (value.toLowerCase())
//   }

//   const handleSearchButton = () => {
//     const value = searchValue.trim();
//     if (value !== "") {
//       const matchedItemsList1 = activeTasksList.filter((task) =>
//         searchItems(task, value)
//       );
//       const matchedItemsList2 = completedTasksList.filter((task) =>
//         searchItems(task, value)
//       );
//       dispatch(setSearchValue(""))
//       dispatch(setMatchedItems([...matchedItemsList1, ...matchedItemsList2]))
//       dispatch(setDisplayList("matched"))
//     }
//   }



//   return (
//     <>

//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/add">AddTask</Link>
//           </li>
//         </ul>
//       </nav>

//       <Routes>
//         <Route path="/"
//           element={<Home
//             currentInput={currentInput}
//             searchValue={searchValue}
//             allTasksList={allTasksList}
//             activeTasksList={activeTasksList}
//             completedTasksList={completedTasksList}
//             matchedItems={matchedItems}
//             displayList={displayList}
//             addButton={addButton}
//             enterInput={enterInput}
//             filterCheckedTasks={filterCheckedTasks}
//             handleCheckBox={handleCheckBox}
//             onSearch={onSearch}
//             searchItems={searchItems}
//             handleSearchButton={handleSearchButton}
//             activeTasksButton={activeTasksButton}
//             completedTasksButton={completedTasksButton}
//           />}
//         />
//         <Route path="/add"
//           element={<AddTask handleInput={enterInput}
//             handleClick={addButton}
//             currentInput={currentInput}
//             taskAdded={taskAdded}
//             closeButton={closeButton}
//           />}
//         />
//       </Routes>


//     </>
//   );
// }

// export default App;






