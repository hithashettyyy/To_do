import React from 'react'
import SearchBar from "./SearchBar.js";

function Home({
    currentInput,
    searchValue,
    allTasksList,
    activeTasksList,
    completedTasksList,
    matchedItems,
    displayList,
    addButton,
    enterInput,
    filterCheckedTasks,
    handleCheckBox,
    onSearch,
    searchItems,
    handleSearchButton,
    activeTasksButton,
    completedTasksButton
}
) {


    return (
        <>

            <h1 className="header">To do list</h1>

            <div class="inputs">

                <SearchBar
                    searchVal={searchValue}
                    onSearch={onSearch}
                    handleSearch={handleSearchButton}
                />
            </div>


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


            <div className="tasks_list">
                {
                    displayList === "active" && activeTasksList.map((task) => {
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
            </div>


            <div className="tasks_list">

                {displayList === "completed" && completedTasksList.map((task) => {
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

            </div>


            <div className="tasks_list">

                {displayList === "matched" && matchedItems.map((task) => {
                    return (
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
    )
}

export default Home
