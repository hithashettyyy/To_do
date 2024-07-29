import React from 'react';
import SearchBar from "./SearchBar.js";
import EditBar from './EditBar.js';
import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import '../Stylesheets/App.css'
import { useSelector } from 'react-redux';
import { SiTask } from 'react-icons/si';

function Home({
    searchValue,
    allTasksList,
    matchedItems,
    displayList,
    handleCheckBox,
    onSearch,
    handleSearchButton,
    activeTasksButton,
    completedTasksButton,
    handleDelete,
    editTask,
    handleEdit
}) {
    
    const editView = useSelector(state=>state.editView)

    const renderTask = (task) => (
        <div className="individual_tasks" key={task.id}>
            <input
                type="checkbox"
                onClick={() => handleCheckBox(task)}
                checked={task.completed}
                className="checkbox"
            />
            <div className="task-name">
                {task.title}
            </div>
            <div className='icons-div'>
                <MdModeEditOutline size={30} cursor='pointer' onClick={()=>editTask(task)} />
                <AiOutlineDelete size={35} fill='black' cursor='pointer' onClick={() => handleDelete(task.id)} />
            </div>
        </div>
    );

    return (
        <>
            <h1 className="header">To do list</h1>

            <div className="inputs" id={editView==true ? 'hide' : ''}>
                <SearchBar
                    searchVal={searchValue}
                    onSearch={onSearch}
                    handleSearch={handleSearchButton}
                />
            </div>

            <div className="buttons" id={editView==true ? 'hide' : ''}>
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

            <div className='inputs' id={editView==false ? 'hide' : ''}>
                <EditBar
                    handleEdit={handleEdit}
                />
            </div>

            <div className="tasks_list">
                {displayList === "active" &&
                    allTasksList
                        .filter(task => !task.completed)
                        .map(task => renderTask(task))
                }
            </div>

            <div className="tasks_list">
                {displayList === "completed" &&
                    allTasksList
                        .filter(task => task.completed)
                        .map(task => renderTask(task))
                }
            </div>

            <div className="tasks_list">
                {displayList === "matched" &&
                    matchedItems.map(task => renderTask(task))
                }
            </div>
        </>
    );
}

export default Home;
