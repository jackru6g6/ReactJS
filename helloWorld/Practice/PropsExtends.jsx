///匯入react和react-dom
import React from 'react';
import ReactDOM from 'react-dom';
import PropType from 'prop-types';

{/*●Props繼承呼叫*/}
class HelloTitle extends React.Component{
    render(){
        return <h1>Hello, {this.props.name}</h1>
    }
}

class TitleDiv extends React.Component{
    render(){
        return <HelloTitle name="Jack" />
    }
}

ReactDOM.render(
    <TitleDiv/>,
    document.getElementById('root')
);