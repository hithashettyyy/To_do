import {
    SET_ALL_TASKS_LIST,
    SET_CURRENT_INPUT,
    SET_SEARCH_VALUE,
    SET_MATCHED_ITEMS,
    SET_DISPLAY_LIST,
    SET_TASK_ADDED,
    SET_EDIT_VIEW,
    SET_EDIT_TASK,
    SET_EDIT_VALUE
} from './tasksActionTypes'

export const setAllTasksList = (tasks)=>(
    {
        type : SET_ALL_TASKS_LIST,
        payload : tasks,
    }
)

export const setCurrentInput = (input)=>(
    {
        type : SET_CURRENT_INPUT,
        payload : input,
    }
)

export const setSearchValue = (value)=>(
    {
        type : SET_SEARCH_VALUE,
        payload : value
    }
)


export const setMatchedItems = (items)=>(
    {
        type : SET_MATCHED_ITEMS,
        payload : items
    }
)

export const setDisplayList = (list)=>(
    {
        type : SET_DISPLAY_LIST,
        payload : list
    }
)

export const setTaskAdded = (status)=>(
    {
        type : SET_TASK_ADDED,
        payload : status
    }
)

export const setEditView = (value)=>(
    {
        type: SET_EDIT_VIEW,
        payload : value
    }
)

export const setEditTask = (value)=>(
    {
        type: SET_EDIT_TASK,
        payload : value
    }
)

export const setEditValue = (value)=>(
    {
        type: SET_EDIT_VALUE,
        payload : value
    }
)


