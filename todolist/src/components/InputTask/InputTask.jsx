import React from "react"
import {connect} from "react-redux"
import {InputTasksForm} from "../InputTasksForm"
import {addTodoList} from "../../actions"

class ConnectInputTask extends React.Component{
    constructor(props){
        super(props)

        if(this.props.listData){
            this.state = this.props.listData
        }
        else{
            this.state = {id:"", name:"", date:"", time:"", file:"", commit:"", important:"", complete:false}
        }
        
        this.changeState = this.changeState.bind(this)
        this.submitTodo = this.submitTodo.bind(this)
        this.tagImportant = this.tagImportant.bind(this)
        this.filebox = React.createRef()       

        ///如果有該事件就執行，沒有代表是新增狀態，並重新命名為changeListState
        ///設定匿名function，執行complete或者important動作
        this.changeListState = type =>{
            if(this.props.changeState){
                this.props.changeState(type)
            }
            else{
                console.log('新增狀態所以沒有this.props.changeState')
            }
        }
    }

    changeState(event){
        ///取目前發生改變的值
        let value = event.target.value
        
        ///如果是檔案的話因為會有路徑，所以這裡只抓檔名
        if(event.target.name === "file"){
            ///去取最後一個出現的「/反斜線」到最後一個字就是檔名了
            value = value.substring(value.lastIndexOf('\\') + 1)
        }
        ///checkbox也另外處理，因為沒有值
        else if(event.target.name === "complete"){
            value = event.target.checked

            ///一併更新狀態到外面的`List`組件去
            this.changeListState('complete')
        }

        debugger;
        ///設定值給對應的name欄位，所以我們組件的name都要設的和state中的名稱一樣
        this.setState({[event.target.name]:value})
    }

    ///星星事件
    tagImportant(){
        debugger;
        ///如果現在不是重要的就把它變重要的
        if(this.state.important == ""){
            this.setState({important:"Y"})
        }
        else{
            this.setState({important:""})
        }

        ///一併更新狀態到外面的`List`組件去
        this.changeListState('important')
    }

    submitTodo(){
        ///先檢查資料，至少要有名稱
        if(this.state.name === ""){
            alert("待辦事項名稱未輸入！")
        }
        else{
            if(this.state.id === ""){
                ///新增動作
                ///因為state就存著資料，所以直接把state送給他新增
                this.props.addTodoList(this.state)
                alert("新增成功！")
            }
            else{
                ///編輯動作
                ///this.props.editTodoList為上方傳回來
                this.props.editTodoList(this.state)
                alert("編輯成功！")
            }

            ///關閉新增畫面
            this.props.closeAdd()
            //初始化資料資料
            this.setState({id:'', name:'', date:'', time:'', file:'', commit:'', important:'', complete:false})
            ///不受控組件另外處理
            this.filebox.current.value = ''
        }
    }

    render(){
        return(
            <div>
                <div class={this.state.important == 'Y' ?
                    'important inputTaskTitle' : 'inputTaskTitle'}>
                    <input name="complete" type="checkbox" class="taskChk"
                        checked={this.state.complete}
                        onChange={this.changeState} />
                    {/*替該name設定對應的state名稱，然後指定value為state中的值，和增加onChange事件，讓值改變時可以同時寫回`state`*/}
                    <input name="name" type="text" placeholder="Type Something Here…"
                        class={(this.state.important == 'Y' ?
                            'important taskTitle ' : 'taskTitle ') +
                            (this.state.complete ? 'complete' : '')}
                        value={this.state.name}
                        onChange={this.changeState} />
                    <i class={this.state.important == 'Y' ?
                        'fas fa-star fa-lg icon iconImportant' : 'far fa-star fa-lg icon'}
                        onClick={this.tagImportant} ></i>
                    <i class="fas fa-pen fa-lg icon icon_edit"></i>
                </div>
                <InputTasksForm closeAdd={this.props.closeAdd}
                    stateData={this.state}
                    changeState={this.changeState}
                    submitTodo={this.submitTodo}
                    filebox={this.filebox} />
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        ///使用dispatch呼叫事件addTodoList操作store   
        addTodoList: todoList => dispatch(addTodoList(todoList))
    }
}

///替ConnectInputTask組件和addTodoList做connect！而connect後又會是一個新組件輸出(InputTask)
const InputTask = connect(null,mapDispatchToProps)(ConnectInputTask)

export {InputTask}
