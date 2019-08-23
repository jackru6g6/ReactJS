import {todoData} from "../constants/todoList.js"
import {ADD_TODOLIST, EDIT_TODOLIST} from "../constants/todoAction-type.js"


const todoListReducer = (state = todoData, action) => {
    switch(action.type){
        case ADD_TODOLIST:{
            action.payload.id = state.length + 1
            return [...state,action.payload]
        }
        case EDIT_TODOLIST:{
            ///先以目前的資料去複製另一個全新的陣列
            let newState = state.slice(0)

            ///下迴圈比對id值
            for(let i=0;i<=newState.length;i++){
                if(newState[i].id === action.payload.id){
                    ///將新的資料用splice()取代原本的位置中的資料
                    newState.splice(i,1,action.payload)
                    break;
                }
            }

            return newState
        }
        default:{
            return state
        }
    }
}

export {todoListReducer}