import React from 'react';
import ReactDOM from 'react-dom';

{/*●if應用*/}

//另外建立一個組件HelloTitle
class HelloTitle extends React.Component{
    render(){
        //將props.title的值帶入標題
        return <h1>{this.props.title}！您好！</h1>
    }
}

class InputGender extends React.Component{
	//使用類別中的constructor建構子，參數中傳入props是必要的
    constructor(props){
		//super呼叫上一層類別也就是React.Component內的props屬性
        super(props)
        this.state = ({gender : ''})
        this.changeGender = this.changeGender.bind(this)
    }
    //strA是傳入的參數
    changeGender(strA){
        console.log(`傳入參數${strA}`)
        console.log(window.event.target)
        this.setState({gender:event.target.value})
    }
    componentDidUpdate(){
        console.log(`已將state.gender變動為：${this.state.gender}`)
    }
    render(){
        return (
        <div>
            {(this.state.gender == "M") ?
            <HelloTitle title="先生" /> : <HelloTitle title="小姐" />}
            <select onChange={this.changeGender.bind(this)}>
                <option value="M">男</option>
                <option value="W">女</option>
            </select>
        </div>)
    }
}
ReactDOM.render(<InputGender />,document.getElementById('root'))
