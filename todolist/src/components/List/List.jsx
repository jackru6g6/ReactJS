import React from "react"
import {connect} from "react-redux"
import {InputTask} from "../InputTask"
import {editTodoList} from "../../actions"

class ConnectList extends React.Component{
    constructor(props){
        super(props)

        this.state = {important:this.props.listData.important,
                      complete:this.props.listData.complete,
                      editTasks:null}
        
        ///List隱藏的那個div
        this.list = React.createRef()

        this.changeState = this.changeState.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.updateTodolist = this.updateTodolist.bind(this)
    }

    changeState(type){
        switch(type){
            case "complete":{
                this.setState({complete: window.event.target.checked},
                               this.updateTodolist)
                break;
            }
            case "important":{
                this.setState({important:(this.state.important == ""? "Y" : "")},
                                this.updateTodolist)
                break;
            }
        }
    }

    openEdit(){
        ///標記完成或者重要時，不執行openEdit
        if(event.target.className.indexOf('fa-star') === -1 &&
           event.target.className.indexOf('taskChk') === -1){
            this.list.current.style.display = "none"
            this.setState({editTasks:(<InputTask closeAdd={this.closeEdit} 
                                                 listData={this.props.listData}
                                                 changeState={this.changeState.bind(this)}
                                                 editTodoList={this.props.editTodoList} />)})
        }
    }

    closeEdit(){
        this.list.current.style.display = ""
        this.setState({editTasks:null})
    }

    updateTodolist(){
        ///複製一份新的物件，為該代辦事項的資料
        let updateList = Object.assign({},this.props.listData)

        ///用之前學過的解構賦值把complete和important兩個欄位替換成state的值
        updateList = {...updateList,
                        complete:this.state.complete,
                        important:this.state.important}

        ///透過editTodoList丟到redux更新
        this.props.editTodoList(updateList)
    }

    render(){
        return(
            <div class="listBlock">
                <div class={"list" + (this.state.important == "Y"? " important" : "")}
                      onClick={this.openEdit} ref={this.list} >
                    <input type="checkbox" class="taskChk" checked={this.state.complete} onChange={this.changeState.bind(this,'complete')} />
                    <input type="text" class={"taskTitle" + (this.state.complete? " complete " : "") + (this.state.important? " important " : "")} value={this.props.listData.name} />
                    <i class={this.state.important=="Y"?  " fas fa-star fa-lg iconImportant icon" : " far fa-star fa-lg icon"}
                    onClick={this.changeState.bind(this,"important")}/>
                    <i class="fas fa-pen fa-lg icon"/>

                    <div class="listIcon">
                        {this.props.listData.date!=""? <i class="far fa-calendar-alt icon"></i> : ""}
                        {this.props.listData.date!=""? `${this.props.listData.date.substring(5).replace("-", "/")}` : ""}
                        {this.props.listData.file!=""? <i class="fas fa-file icon"></i> : ""}
                        {this.props.listData.commit!=""? <i class="far fa-comment-dots icon"></i> : ""}
                    </div>
                </div>
                <div>
                    {this.state.editTasks}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        ///使用dispatch呼叫事件editTodoList操作store 
        editTodoList: todoList => dispatch(editTodoList(todoList))  
    }
}

///替ConnectList組件和editTodoList做connect！而connect後又會是一個新組件輸出(InputTask)
const List = connect(null, mapDispatchToProps)(ConnectList)

export {List}