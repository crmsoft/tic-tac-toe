import React, {Component} from 'react';

class Nav extends Component {
    
    constructor(mode) {
        super(mode);
        this.state = {
            MODE_SMALL: '2X2',
            MODE_BIG: '5X5',
            CURRENT_MODE: mode === '5X5' ? '2X2':'5X5'
        }
        this.handleClikc = this.handleClikc.bind(this);
    }

    handleClikc(){
        this.setState({
            CURRENT_MODE: this.state.CURRENT_MODE === this.state.MODE_SMALL ? this.state.MODE_BIG:this.state.MODE_SMALL
        });   
        this.props.onChange(this.state.CURRENT_MODE);  
    }

    render() {
        return (
            <nav>
                <a href="javascript:void(0)" onClick={this.handleClikc} className={this.state.CURRENT_MODE === this.state.MODE_SMALL ? '':'disabled'}>2X2</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" onClick={this.handleClikc} className={this.state.CURRENT_MODE === this.state.MODE_BIG ? '':'disabled'}>5X5</a>
            </nav>
        )
    }
}

export default Nav;