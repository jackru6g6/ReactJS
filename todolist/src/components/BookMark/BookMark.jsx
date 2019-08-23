import React from "react"
import {Route, Link} from "react-router-dom"

class BookMark extends React.Component{
    render(){
        return(
            <Route exact path={this.props.to}
                children={props=>{
                    let className = "bookMark"
                    /*判斷目前的路徑有沒有符合path，如果有的話就會傳入match，
                    所以當match有值，我就將他的class多設定一個select_bookMark，否則的話就是一般的bookMark*/
                    {props.match?className += " select_bookMark" : className="bookMark"}

                    return(
                        <Link to={this.props.to}>
                            <button class={className}>
                                {this.props.name}
                            </button>
                        </Link>
                    )
                }}/>
        )
    }
}

export {BookMark}