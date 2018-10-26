import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import TrainingSessionForm from './TrainingSessionForm';
import TrainingSessionsList from './TrainingSessionsList';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container text>
        <TrainingSessionForm />
        <TrainingSessionsList />
      </Container>
    );
  }
}

export default App;
