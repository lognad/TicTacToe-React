import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TicTacToe.css';

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
            return [squares[a], [a, b, c]];
        }
    }
    return null;
}

class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className={"square " + this.props.styles} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        let gameStat = calculateWinner(squares);
        let stat = gameStat ? gameStat[0] : gameStat;
        if (stat || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    renderSquare(i, style) {
        return <Square
            styles={(style === undefined || style === -1) ? '' : 'win-line'}
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        let gameStat = calculateWinner(this.state.squares)
        const winner = gameStat ? gameStat[0] : gameStat;
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
            // let [a, b, c] = gameStat[1];
            return (
                <div>
                    <div className="status">{status}</div>
                    <div className="board-row">
                        {this.renderSquare(0, (gameStat[1].indexOf(0)))}
                        {this.renderSquare(1, (gameStat[1].indexOf(1)))}
                        {this.renderSquare(2, (gameStat[1].indexOf(2)))}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3, (gameStat[1].indexOf(3)))}
                        {this.renderSquare(4, (gameStat[1].indexOf(4)))}
                        {this.renderSquare(5, (gameStat[1].indexOf(5)))}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6, (gameStat[1].indexOf(6)))}
                        {this.renderSquare(7, (gameStat[1].indexOf(7)))}
                        {this.renderSquare(8, (gameStat[1].indexOf(8)))}
                    </div>
                </div>
            );
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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

class TicTacToe extends React.Component {
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

//   ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
//   );




export default TicTacToe;