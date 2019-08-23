import React from 'react';
import ReactDOM from 'react-dom';

{/*留言板練習*/}

//假設這是取的資料，或者ajax取得資料
let data = [
    {id:1, name:"Jack", message:"早上好~"},
    {id:2, name:"Hi講", message:"走狗屎運的一天！"},
    {id:3, name:"關你屁事", message:"哈哈，怎麼說啊?"},
    {id:4, name:"Jack", message:"對阿，你今天發生甚麼事?"},
    {id:5, name:"Hi講", message:"爽"},
];

class Message extends React.Component{
    render(){
        let divStyle = {marginBottom:20};
        let messageStyle={marginLeft:20};
        return(
            <div style={divStyle}>
                <div>{this.props.name} 對大家說：</div>
                <div style={messageStyle}>{this.props.message}</div>
            </div>
        )
    }
}

class MessageBlock extends React.Component{
    render(){
        let message = this.props.messageData.map((item)=>{
            if(item.name.indexOf(this.props.searchName)!=-1){
                return <Message key={item.id}
                                name={item.name} 
                                message={item.message}/>
            }
        });
        return(
            <div> 
                {message} 
            </div>
        )
    }
}

class SearchBlock extends React.Component{
    render(){
        return(
            <div>
                <span>搜尋留言人：</span>
                <input type="text" 
                       value={this.props.searchName}
                       onChange={this.props.changeState}/>
            </div>
        )
    }
}

class MessageForm extends React.Component{
    constructor(props){
        super(props);
        this.state = ({name:""});
        this.changeState = this.changeState.bind(this);
    }

    changeState(event){
        this.setState({name:event.target.value})
    }

    render(){
        return(
            <div>
                <SearchBlock searchName={this.state.name}
                             changeState={this.changeState}/>
                <hr/>
                <MessageBlock messageData={this.props.messageData} 
                              searchName={this.state.name}/>
            </div>
        )
    }
}

ReactDOM.render(<MessageForm messageData={data} />, document.getElementById('root'))