import React from 'react';

class ScoreBoard extends React.Component {
    render() {
        return (
            <span className="score">
                <span>PLAYER X : {this.props.SCORE_X}</span>
                <span>PLAYER O : {this.props.SCORE_O}</span>
            </span>
        )
    }
}

export default ScoreBoard;