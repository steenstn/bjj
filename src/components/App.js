import React from 'react';
import {
  Button, Segment, Input, Menu, Grid,
} from 'semantic-ui-react';
import './App.css';

import MenuTop from './MenuTop';
import MenuBottom from './MenuBottom';

import NewSessionForm from './NewSessionForm';
import PastSessionsView from './PastSessionsView';
import PlannedSessionsView from './PlannedSessionsView';

class App extends React.Component {
  state = { activePane: 'Past Sessions' };

  handleClick = (newPane) => {
    this.setState({ activePane: newPane });
  };

  render() {
    const { activePane } = this.state;
    return (
      <Grid className="mainWrapper" container verticalAlign="middle" columns={16} centered>
        <MenuTop handleClick={this.handleClick} />
        <NewSessionForm visible={activePane === 'New Session Form'} />
        <PastSessionsView visible={activePane === 'Past Sessions'} />
        <PlannedSessionsView visible={activePane === 'Planned Sessions'} />
        <MenuBottom handleClick={this.handleClick} />
      </Grid>
    );
  }
}

export default App;
