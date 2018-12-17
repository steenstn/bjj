import React, { Component } from 'react';
import TrainingSessionForm from './TrainingSessionForm';
import TrainingSessionsList from './TrainingSessionsList';
import MoveComponent from './moves/MoveComponent';

class Dashboard extends Component {

    render() {
        return (
        <div>
            <p>Moves</p>
            <MoveComponent />
            <TrainingSessionForm />
            <TrainingSessionsList />
        </div>);
    }
}

export default Dashboard