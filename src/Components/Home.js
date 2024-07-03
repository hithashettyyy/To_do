import React from 'react';
import SearchBar from "./SearchBar.js";

function Home({
    searchValue,
    allTasksList,
    matchedItems,
    displayList,
    handleCheckBox,
    onSearch,
    handleSearchButton,
    activeTasksButton,
    completedTasksButton
}) {
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
        </div>
    );

    return (
        <>
            <h1 className="header">To do list</h1>

            <div className="inputs">
                <SearchBar
                    searchVal={searchValue}
                    onSearch={onSearch}
                    handleSearch={handleSearchButton}
                />
            </div>

            <div className="buttons">
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
