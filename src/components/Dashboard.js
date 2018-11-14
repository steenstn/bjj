import React, { Component } from 'react';
import TrainingSessionForm from './TrainingSessionForm';
import TrainingSessionsList from './TrainingSessionsList';

class Dashboard extends Component {

    render() {
        return (
        <div>
            <TrainingSessionForm />
            <TrainingSessionsList />
        </div>);
    }
}

export default Dashboard