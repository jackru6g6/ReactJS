import React from 'react';
import ReactDOM from 'react-dom';


class Message extends React.Component{
    constructor(props){
        super(props)
        this.state = ({style:{backgroundColor:'#FFFFFF',height:100,width:'80%'}})
    }
    render(){
        return <div style={this.state.style}>
                    {this.props.children}
               </div>
    }
}

class MessageBlock extends React.Component {
    constructor(props){
        super(props)
        this.state = ({style:{backgroundColor:'#DDDDDD',height:200,width:'100%'}})
    }

    render(){
        return (
        <div style={this.state.style}>
            <Message children="從props傳進內容">
                <p>props.children的內容會以這裡為主</p>
            </Message>
        </div>)
    }
}

ReactDOM.render(<MessageBlock  />, document.getElementById('root'))