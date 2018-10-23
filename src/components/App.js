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
  }
}

export default App;
