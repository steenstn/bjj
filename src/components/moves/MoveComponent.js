import React, { Component } from 'react';
import MovesList from './MovesList';
import MoveForm from './MoveForm';

class MoveComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {moves: []};
    }

    
    componentDidMount() {
        let token = localStorage.getItem("token");
        fetch(process.env.REACT_APP_BACKEND_URL + "/moves", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
        .then((result) => {
            this.setState({moves: result});
        });
    }

    render() {
        return(
            <div>
                <MoveForm />
                <MovesList moves={this.state.moves}/>
            </div>
        );
    }
}

export default MoveComponent;