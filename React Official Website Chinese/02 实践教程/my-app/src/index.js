import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {//zqkang: 方块，即棋盘里的一个个小格
    constructor(props){
        super(props);
        /**
         * 注意：在js class中，每次你定义其子类的构造函数时，都需要调用super方法。因此，在所有
         * 含有构造函数的React组件中，构造函数必须以super(props)开头。
         */
        this.state={
            value:null,
        };
    }

    render() {
      return (
        <button 
            className="square" 
            onClick={() => this.setState({value:'X'})}>
          {this.state.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {//zqkang, 板子，即棋盘
    renderSquare(i) {
      return <Square value={i} />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  