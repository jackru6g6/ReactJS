import React from 'react';
import ReactDOM from 'react-dom';

{/*for迴圈*/}

class TodoList extends React.Component{
    constructor(props){
        super(props)
    }

    // render(){
    //     let arrayLists =['上班','午休','下班'];
    //     let listsES5 = arrayLists.map(function(list){return <li>{list}</li>});//ES5語法
    //     let listsES6 = arrayLists.map((list) => <li>{list}</li>);//ES6語法

    //     return (
    //         <ul>
    //             {listsES5}
    //             {listsES6}
    //         </ul>
    //     )
    // }
    render(){
        /*
        為了避免重新渲染重複畫面，react會去比對key值，相同key則略過
        */
        let lists = this.props.objLists.map((list) => 
            /*key值的資料就給唯一值id指定。key不會被當屬性渲染，如果需要，則另外增設屬性。ex: id={list.id}*/
            <li key={list.id}>{list.list}</li>);
        
        return(
            <ul>
                {lists}
            </ul>
        )
    }
}

//假設我們拿到的陣列中，有每一個資料的物件(ajax)
let objLists = [
    {id:"a", list:"測試"},
    {id:"B", list:"睡覺"},
    {id:"C", list:"打咚咚"}
]

ReactDOM.render(<TodoList objLists={objLists}/>,document.getElementById('root'))
