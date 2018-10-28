import React from 'react';
import { Button, Segment, Input } from 'semantic-ui-react';
import './App.css';
import TrainingSessionForm from './TrainingSessionForm';
import TrainingSessionList from './TrainingSessionsList';

class App extends React.Component {
  state = { activeItem: 'Previous Sessions' };

  handleItemClick = (e, { content }) => this.setState({ activeItem: content });

  render() {
    const { activeItem } = this.state;
    return (
      <React.Fragment>
        <Button
          primary
          fluid
          icon={{ name: 'dropdown' }}
          content="Add a new training session"
          onClick={this.handleItemClick}
        />
        <TrainingSessionForm />
        <Button.Group fluid compact widths={2}>
          <Button
            icon={{ name: 'calendar alternate outline' }}
            content="Previous Sessions"
            active={activeItem === 'Previous Sessions'}
            onClick={this.handleItemClick}
          />
          <Button
            icon={{ name: 'clock outline' }}
            content="Planned Sessions"
            active={activeItem === 'Planned Sessions'}
            onClick={this.handleItemClick}
          />
        </Button.Group>
      </React.Fragment>
    );
  }
}

export default App;
