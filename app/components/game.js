import React from 'react';
import Nav from './navigation';
import ScoreBoard from './score-board';

let winMoves = { 
    '2X2' : [
        [0,1,2], 
        [3,4,5], 
        [6,7,8], 
        [0,3,6], 
        [1,4,7], 
        [2,5,8], 
        [0,4,8], 
        [2,4,6]
    ],
    '5X5' : [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10,11,12,13,14],
        [15,16,17,18,19],
        [20,21,22,23,24],
        [0, 5, 10,15,20],
        [1, 6, 11,16,21],
        [2, 7, 12,17,22],
        [3, 8, 13,18,23],
        [4, 9, 14,19,24],
        [0, 6, 12,18,24],
        [4, 8, 12,16,20]
    ]
 };

class Game extends React.Component {
    
    constructor(){
        super();
        this.state = {
            MOVE_X: 'X',
            MOVE_O: 'O',
            SCORE_X: 0,
            SCORE_O: 0,
            CURRENT_MOVE: 'X',
            CURRENT_MODE: null,
            boxes: null,
            winner: null
        }
        this.restart = this.restart.bind(this);
        this.handleNav = this.handleNav.bind(this);
    }

    componentWillMount(){
        this.state.CURRENT_MODE = this.props.size;
        this.state.boxes = new Array( this.state.CURRENT_MODE === '2X2' ? 9:25 ).fill("");
    }

    restart(){
        this.setState({
            CURRENT_MOVE: 'X',
            boxes: new Array( this.state.CURRENT_MODE === '2X2' ? 9:25 ).fill(""),
            winner: null 
        });
    }

    handleClick(index,event){

        if(this.state.boxes[index] || this.state.winner)
            return;     

        this.state.boxes[index] = this.state.CURRENT_MOVE;
        let isGameEnd = this.checkBoard();
        isGameEnd ? this.state['SCORE_'+this.state.CURRENT_MOVE]++:null;
        this.setState({
            boxes: this.state.boxes,
            CURRENT_MOVE: this.state.CURRENT_MOVE === this.state.MOVE_X ? this.state.MOVE_O:this.state.MOVE_X,
            winner: isGameEnd
        });
    }

    checkBoard(){

        let current_move = this.state.CURRENT_MOVE;
        let board = this.state.boxes;
        let mode = this.state.CURRENT_MODE;
        return winMoves[mode].find((move) => {
            return mode === '2X2' ? 
            (board[move[0]] === board[move[1]] && board[move[1]] === board[move[2]] && board[move[0]] !== "" && board[move[1]] !== "" && board[move[2]] !== "")
            :
            (board[move[0]] === board[move[1]] && board[move[1]] === board[move[2]] && board[move[2]] === board[move[3]] && board[move[3]] === board[move[4]] && board[move[0]] !== "" && board[move[1]] !== "" && board[move[2]] !== "" && board[move[3]] !== "" && board[move[4]] !== "");  
        });
    }

    getBoxClass(index){
        let w = this.state.CURRENT_MODE === '2X2' ? 'big ':'small ';
        let divider = this.state.CURRENT_MODE === '2X2' ? 3:5;
        let length = this.state.boxes.length;
        w += this.state.winner && 
        (this.state.winner[0] === index || 
        this.state.winner[1] === index || 
        this.state.winner[2] === index || 
        (this.state.winner[3] && this.state.winner[3] === index) ||
        (this.state.winner[4] && this.state.winner[4] === index)) ? 'winner-path ':'';
        w += 0 % divider === 0 ? 
                    (index !== 0 && (length % (index + 1) % divider === 0) ? 
                    'border-bottom ' 
                    : 
                    'border-bottom-right ')
                    :
                    '';
        w += (index > (length - divider - 1) ? 'no-border-bottom ':'');
        return w;
    }

    handleNav(mode){
        this.state.CURRENT_MODE = mode;
        this.restart();
    }

    render() {

        var items = this.state.boxes.map((v,i) => {
            return (<div className={ this.getBoxClass(i) } onClick={this.handleClick.bind(this,i)} key={i.toString()}>{v}</div>);
        });
        
        return (
            <section>
                <Nav activeMode={this.props.size} onChange={this.handleNav} />
                {this.state.winner ? <h1>The  winner is {this.state.boxes[this.state.winner[0]]}</h1>:<h3>{this.state.CURRENT_MOVE} PLAYER MOVE</h3>}
                <div className="game">
                    {items}
                </div>
                <ScoreBoard SCORE_X={this.state.SCORE_X} SCORE_O={this.state.SCORE_O} />
                <a href="#" className="reload-btn" onClick={this.restart}>New</a>
            </section>
        )
    }
}

export default Game;