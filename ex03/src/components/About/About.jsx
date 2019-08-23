import React from "react"
import { Route, Link, Switch, Redirect} from "react-router-dom"

class About extends React.Component{
    render(){
        return (
            <div>
                <h2>這邊是關於我們</h2>
                <ul>
                    <li><Link to={`${this.props.match.url}`}>理念介紹</Link></li>
                    <li><Link to={`${this.props.match.url}/his`}>歷史沿革</Link></li>
                    <li><Link to={`${this.props.match.url}/story`}>品牌故事</Link></li>
                    <Link to={`${this.props.match.url}/hello/Jack`}>用Component渲染組件</Link>
                    <CusLink to={`${this.props.match.url}/hey/GQSM`} name="用render渲染組件" />
                </ul>
                <Switch>
                    {/*Route可以在url符合path的時候，將該Route內指定的component*/}
                    <Route exact path={`${this.props.match.path}`} component={Introd} />
                    <Route path={`${this.props.match.path}/his`} component={His} />
                    {/* <Redirect from={`${this.props.match.path}/story`} to={`${this.props.match.url}/his`} /> */}
                    <Redirect from={`${this.props.match.path}/story`} 
                                to={{pathname:`${this.props.match.url}/his`
                                    ,search: "?hey=UCCU"
                                    ,state:{name:'Referrer'}}} />
                    {/* <Route path={`${this.props.match.path}/hello/:userName`} component={Hello}></Route> */}
                    <Route path={`${this.props.match.path}/hello/:userName`} component={Hello}></Route>
                </Switch>
            </div>
        )
    }
}

class CusLink extends React.Component{
    render(){
        return(
            <Route /*(1)*/ path={this.props.to} 
                   /*(2)*/ children={props=>{
                                console.log(props.match)
                                //(3)
                                return(
                                    <li>
                                        {props.match ? ">" : ""}
                                        <Link to={this.props.to}>{this.props.name}</Link>
                                    </li>)
            }} />
        )
    }
}

// class Hello extends React.Component{
//     constructor(props){
//         super(props)

//         this.state=({userName:this.props.match.params.userName})
//         this.updateName = this.updateName.bind(this)
//     }

//     updateName(){
//         this.setState()
//     }

//     render(){
//         // return <h1 onClick={this.updateName}>Hello！{this.props.match.params.userName}！</h1>

//         return <ListNumber keyonClick={this.updateName}>Hello！{this.state.userName}！</h1>
//     }
// }

class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           value: 0
        }
        this.updateState = this.updateState.bind(this)
     };

     updateState(e) {
        debugger;
        var score = this.state.value;
        score += 1; 
        this.setState({value: score});
     }

    render() {
       debugger;
       const numbers = [1, 2, 3, 4, 5];

       const listItem = numbers.map((number)=>
          <ListNumber key={number.toString()} 
                      value={number+this.state.value} 
                      changeValue={this.updateState}/>
          );
       return (
          <ul>{listItem}</ul>
       );
    }
 }
 
 class ListNumber extends React.Component{
    constructor(){
       super();
    }
    render(){
       return (
           <div>
                <button onClick={this.props.changeValue}>Add</button>
                <li>{this.props.value}</li>
            </div>
       );      
    }
 }


class Introd extends React.Component {
    render() {
        return <p>這裡是理念介紹</p>
    }
}

class His extends React.Component {
    render() {
        console.log(this.props.location.state)
        return <p>這裡是歷史沿革</p>
    }
}

class NoPage extends React.Component {
    render() {
        return <p>頁面維護中...</p>
    }
}


export {About}