import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {//zqkang: 方块，即棋盘里的一个个小格
//     /**
//      * 在React术语中，我们把目前的Square组件称做受控组件。
//      */
//     // constructor(props){不要了
//     //     super(props);
//     //     /**
//     //      * 注意：在js class中，每次你定义其子类的构造函数时，都需要调用super方法。因此，在所有
//     //      * 含有构造函数的React组件中，构造函数必须以super(props)开头。
//     //      */
//     //     this.state={
//     //         value:null,
//     //     };
//     // }

//     render() {
//       return (
//         <button 
//             className="square" 
//             onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }

//函数组件写法：
function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
    /**
     * 注意：当我们把Square修改成函数组件时，我们同时也把onClick={()=>this.props.onClick()}
     * 改成为更短的onClick={props.onClick}(注意两侧都没有括号)
     */
}
  
  class Board extends React.Component {//zqkang, 板子，即棋盘
    renderSquare(i) {
      return (
        <Square 
            value={this.props.squares[i]} 
            onClick={()=>this.props.onClick(i)}
            />
      );
      /**
       * 为了提高可读性，我们把返回的React元素拆分成了多行，同时在最外层加了小括号，这样
       * js解析的时候就不会在return 的后面自动插入一个分号从而破坏代码结构了。
       */
      /**
       * 注意：因为dom元素button是一个内置组件，因此其onClick属性在React中有特殊含义。而对于用户
       * 自定义的组件来说，命名就可以由用户自己来定义了。我们给square的onClick和Board的handleClick
       * 赋予任意的名称，代码依旧有效。在React中，有一个命名规范，通常会将代表事件的监听prop命名为on[Event],
       * 将处理事件的监听方法命名为handle[Event]这样的格式。
       */
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {//zqkang:游戏本身
    constructor(props){
        super(props);
        this.state={
            history:[{
                squares:Array(9).fill(null),
            }],
            stepNumber:0,
            xIsNext:true,
        }
    }

    handleClick(i){
        const history=this.state.history.slice(0, this.state.stepNumber+1);
        const current=history[history.length-1];
        const squares=current.squares.slice();
        /**
         * 注意：我们调用了.slice方法创建了squares数组的一个副本，而不是直接在现有的数组上进行修改。在下一节，
         * 我们会介绍为什么我们需要创建square数组的副本。
         */
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i]=this.state.xIsNext?'X':'O';
        this.setState({
            history:history.concat([{
                squares:squares,
            }]),
            /**
             * 注意：concat方法可能与你比较熟悉的push方法不太一样，它并不会改变原数组，所以我们推荐使用concat
             */
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext:(step % 2)===0,
        })
    }

    render() {
        const history=this.state.history;
        // const current=history[history.length-1];
        const current=history[this.state.stepNumber];
        const winner=calculateWinner(current.squares);

        const moves=history.map((step, move)=>{
            const desc=move?
            'Go to move #'+move:
            'Go to game start';
            return(
                <li key={move}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if(winner){
            status='Winner: '+winner;
        }else{
            status='Next player: '+(this.state.xIsNext?'X':'O');
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i)=>this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }