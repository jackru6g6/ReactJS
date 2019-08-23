import {ADD_TODOLIST, EDIT_TODOLIST} from "../constants/todoAction-type.js"

///設置指令
export const addTodoList = todoList => ({
    type : ADD_TODOLIST, 
    payload : todoList
})

export const editTodoList = todoList => ({
    type: EDIT_TODOLIST,
    payload: todoList
})