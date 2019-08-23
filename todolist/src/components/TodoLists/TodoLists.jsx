import React from 'react'
import {connect} from "react-redux"
import {List} from "../List"

class ConnectTodoLists extends React.Component{
    render(){
        ///以重要程度和完成做排序
        this.props.data
        .sort((f,s) => {
            return f.important < s.important? 1 : -1
        })
        .sort((f,s) => {
            return f.complete > s.complete? 1 : -1
        })        

        let todoCount = 0;
        let Lists = this.props.data.map((item) =>{
            ///用switch來分隔各頁籤
            switch(this.props.page){
                case "progress":{
                    if(item.complete){
                        return null
                    }
                    break
                }
                case "completed":{
                    if(!item.complete){
                        return null
                    }
                    break;
                }
            }

            if(this.props.page){
                todoCount++
            }
            else if(!item.complete){
                todoCount++
            }

            return <List key={item.id} listData={item}/>
        })

        return(
            <div>
                <div>
                    {Lists}
                </div>
                <div class="countText">
                    <span>
                        {todoCount} tasks {this.props.page === "completed"? "completed" : "left"}
                    </span>
                </div>
            </div>
        )
    }
}

/*
指定用this.props.data做map，所以這裡取資料就要把資料放到data中，如果這邊的data改成其他像是listsData那上方ConnectTodoLists的迴圈就要改成對this.props.listsData
*/
const mapStateToProps = state => {
    return {data:state}
}

///ConnectTodoLists和要取的資料ConnectTodoLists做connect
const TodoLists = connect(mapStateToProps)(ConnectTodoLists)

export {TodoLists}