import React from "react"
import ReactDOM from "react-dom"
import {Main} from "./components/Main"

ReactDOM.render(<Main /> //<Game />
                ,document.getElementById('root'));




// //定義一個function直接產出一個格子
// //ps. function跟class差別在於，class會有自己的屬性以及產出html的方法
// //而 function只會有產出html的方法
// function Square(props) {
//     return (
//       //定義這個button一旦有onClick事件，就會去執行特定的function函數
//       //以紀錄這個格子下了X或是O
//       //這個特定函數的詳細內容，會以屬性props的方式傳進來
//       //你可以用委派delegate或是function pointer的方式來想像即可
//       <button className="square" onClick={props.onClick}>
//         {props.value}
//       </button>
//     );
//   }
  
//   //定義一個Board類別以產出九個空格，讓你可以玩九宮格遊戲
//   class Board extends React.Component {
//     //建構子constructor的固定寫法
//     constructor(props) {
//       super(props);
//       //定義這個類別所需要的屬性
//       //看你需要array, boolean, string, json, json array....
//       //都可以在這定義，但請用jsx的語法而不是用javascript的語法
//       this.state = {
//         //九宮格，所以宣告了一個長度是9陣列，初始值都是null
//         //九個格子的狀態放在Board裡面去管理，才方便判斷是否
//         //X或是O是否已經獲勝了
//         squares: Array(9).fill(null),
//         //下一個要下棋的人是X或是O
//         xIsNext: true,
//       };
//     }
    
//     //每次下棋（就是用滑鼠在任何一個九宮格下X或是O的動作）之後，紀錄該格子下的是是X或是O
//     handleClick(i) {
//       //jsx在操作資料的時候，習慣上不會直接去改原本的那一份
//       //而是先用slice()複製一份一模一樣的，再去改
//       //據官方說明，這樣子的執行效能才會優秀
//       const squares = this.state.squares.slice();
//       //這是判斷當下的狀況，是否X或是O獲勝了
//       if (calculateWinner(squares) || squares[i]) {
//         return;
//       }
//       //紀錄這一格的狀態是X或是O
//       squares[i] = this.state.xIsNext ? 'X' : 'O';
//       //this.setState就是專門用來設定這個類別裡面的屬性用的
//       this.setState({
//         //紀錄最新的下棋狀態
//         squares: squares,
//         //紀錄下一步棋應該換X下或是換O下
//         xIsNext: !this.state.xIsNext,
//       });
//     }
  
//     //這就是Board類別裡面的一個method的定義方式
//     //這個method就叫做renderSquare
//     //就是用來產出一個格子的html
//     //整個棋盤由九個格子構成
//     //因此當然是由Board類別透過renderSquare去產出九個格子
//     renderSquare(i) {   
//       //幫Square格子定義一個onClick事件，
//       //因此當格子下了X或是O的時候，就會呼叫
//       //handleClick（i）來修改Board類別的squares棋盤狀態    
//       return (
//         <Square
//           value={this.state.squares[i]}
//           onClick={() => this.handleClick(i)}
//         />
//       );
//     }
  
//     render() {
//       //任何類別最後產出html的method一律都叫做render
//       //透過calculateWinner()判斷目前是否X或是O已經贏了
//       const winner = calculateWinner(this.state.squares);
//       //用let宣告一個變數
//       //.jsx在宣告變數的時候，請一律改成let
//       //原本.js用var宣告變數的方式由於比較不嚴謹，在.jsx請盡量避免使用var
//       //除非真的需要宣告global variable全域變數的時候，才用var去宣告
//       let status;
//       if (winner) {
//         status = 'Winner: ' + winner;
//       } else {
//         status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//       }
    
//       //設定九個格子的排版，只是很簡單的html排版
//       //這……應該不用多做說明吧 XD
//       return (      
//         <div>
//           <div className="status">{status}</div>
//           <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//       );
//     }
//   }
  
//   class Game extends React.Component {
//     render() {
//       return (
//         <div className="game">
//           <div className="game-board">          
//             <Board />
//           </div>
//           <div className="game-info">
//             <div>{/* status */}</div>
//             <ol>{/* TODO */}</ol>
//           </div>
//         </div>
//       );
//     }
//   }
  
//   // ========================================
  
//   //判斷X或是O是否贏了
//   //只是用陣列來判斷誰贏了而已，很簡單的邏輯，就不多說了
//   function calculateWinner(squares) {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//         return squares[a];
//       }
//     }
//     return null;
//   }