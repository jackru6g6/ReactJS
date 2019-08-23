import React from 'react';
import ReactDOM from 'react-dom';

{/*form*/}

class EasyForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {name:""};
        this.changeState = this.changeState.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    changeState(event){
        let changeName = event.target.name;
        this.setState({ [changeName]: event.target.value });//[]讓JavaScript知道是變數，而非changeName名稱變數
        console.log("改了名子喔");
    }

     //新增一個submit的function
     submitForm(event){
         console.log(`現在輸入的名字是：${this.state.name}`)
         event.preventDefault()//防止submit送出整個網頁，所以用event.preventDefault()來取消submit的預設功能
     }

    render(){
        return (
            <form onSubmit={this.submitForm}>
                <label>姓名：</label>
                <input id="name" name="name" value={this.state.name}
                        onChange={this.changeState}/>
                <br/>
                <input type="submit" value="送出表單" />
            </form>
        )
    }
}

ReactDOM.render(<EasyForm />,document.getElementById('root'))