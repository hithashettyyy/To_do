import {
    SET_ALL_TASKS_LIST,
    SET_CURRENT_INPUT,
    SET_DISPLAY_LIST,
    SET_MATCHED_ITEMS,
    SET_SEARCH_VALUE,
    SET_TASK_ADDED,
    SET_EDIT_VIEW,
    SET_EDIT_TASK,
    SET_EDIT_VALUE
} from '../tasksActionTypes';


const initialState = {
    allTasksList: [],
    currentInput: "",
    searchValue: "",
    displayList: "active",
    matchedItems: [],
    taskAdded: false,
    editView: false,
    editTask: {},
    editValue: ''
}


const tasksReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_ALL_TASKS_LIST:
            return { ...state, allTasksList: action.payload }

        case SET_CURRENT_INPUT:
            return { ...state, currentInput: action.payload }

        case SET_SEARCH_VALUE:
            return { ...state, searchValue: action.payload }

        case SET_MATCHED_ITEMS:
            return { ...state, matchedItems: action.payload }

        case SET_DISPLAY_LIST:
            return { ...state, displayList: action.payload }

        case SET_TASK_ADDED:
            return { ...state, taskAdded: action.payload }
        case SET_EDIT_VIEW:
            return { ...state, editView: action.payload }
        case SET_EDIT_TASK:
            return { ...state, editTask: action.payload }
        case SET_EDIT_VALUE:
            return { ...state, editValue: action.payload }
        default:
            return state
    }
}

export default tasksReducer