import React, { Component } from 'react';
import TrainingSessionForm from './TrainingSessionForm';
import TrainingSessionList from './TrainingSessionsList';

class TrainingSessionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            sessions: []
        }
    }

    componentDidMount = () => {
        let token = localStorage.getItem("token");
          fetch(process.env.REACT_APP_BACKEND_URL + "/trainingsessions", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
          })
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  sessions: result
                });
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                this.setState({
                  isLoaded: true,
                  error: true
                });
              }
            )
    }  

    handleNewTrainingSession = (trainingSession) => {
        let newSessions = this.state.sessions.slice();
        newSessions.push(trainingSession);
        this.setState({sessions: newSessions});
    }

    render = () => {
        if(this.state.error) {
            return (<div><TrainingSessionForm onNewTrainingSession={this.handleNewTrainingSession}/><p>Could not load training sessions..</p></div>)
        } else {
            return (<div><TrainingSessionForm onNewTrainingSession={this.handleNewTrainingSession}/><TrainingSessionList sessions={this.state.sessions}/></div>);
        }
        
    }
}

export default TrainingSessionComponent;