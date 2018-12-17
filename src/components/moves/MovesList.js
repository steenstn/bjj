import React, { Component } from 'react';

class MovesList extends Component {
    constructor(props) {
        super(props);
        this.state = {showItems: []};
    }

    toggleVisible = (id)  => {
        let newShowItems = this.state.showItems.slice();
        newShowItems[id] = !newShowItems[id];
        this.setState({ showItems: newShowItems });
    }
    
    render() {
        const moves = this.props.moves;
        return (
            <div>
                <ul>
                {moves.map((m,index) => (
                    <li 
                        key={m.id} 
                        onClick= { () => this.toggleVisible(index)}>
                    {m.name}{this.state.showItems[index] ? ": " + m.description : ""}
                    </li>))}
                </ul>
            </div>);
    }
}

export default MovesList;