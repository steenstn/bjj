import React, { Component } from 'react';
import MoveComponent from './moves/MoveComponent';
import TrainingSessionComponent from './trainingsessions/TrainingSessionComponent';

class Dashboard extends Component {

    render() {
        return (
        <div>
            <p>Moves</p>
            <MoveComponent />
            <TrainingSessionComponent />
        </div>);
    }
}

export default Dashboard