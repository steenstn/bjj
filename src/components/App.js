import React, { Component } from 'react';
import './App.css';
import TrainingSessionForm from './TrainingSessionForm';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TrainingSessionForm />
      </div>
    );
  }
}

export default App;
