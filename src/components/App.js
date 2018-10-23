import React, { Component } from 'react';
import './App.css';
import TrainingSessionForm from './TrainingSessionForm';
import TrainingSessionsList from './TrainingSessionsList';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
      <TrainingSessionForm />
      <TrainingSessionsList />
      </div>
    );
    /*
    const { error, isLoaded, sessions } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div></div>;
    } else {
      return (
        <ul>
          {sessions.map(session => (
            <li>
              {session.id} {session.date} {session.trainingType} {session.lengthMin}
            </li>
          ))}
        </ul>);
    }*/
  }
}

export default App;
