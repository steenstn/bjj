import React from 'react';
import {
  Button, Segment, Input, Menu, Grid,
} from 'semantic-ui-react';
import './App.css';

import MenuTop from './MenuTop';
import MenuBottom from './MenuBottom';

import NewSessionForm from './NewSessionForm';
import SessionListView from './SessionListView';

class App extends React.Component {
  state = {
    activePane: 'Past Training Sessions',
    error: null,
    isLoaded: false,
    sessions: [],
  };

  componentDidMount() {
    this.loadSessions();
  }

  loadSessions = async () => fetch('/trainingsessions')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          sessions: result,
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      },
    );

  handleMenuClick = (newPane) => {
    this.setState({ activePane: newPane });
  };

  handleDeleteClick = async (event) => {
    console.log(event.target.id);
    const json = JSON.stringify({ id: event.target.id });

    await fetch('/trainingsessions/', {
      method: 'DELETE',
      body: json,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then((res) => {
      console.log(res);
      this.loadSessions();
    });
  };

  render() {
    const {
      activePane, error, isLoaded, sessions,
    } = this.state;
    return (
      <React.Fragment>
        <MenuTop handleClick={this.handleMenuClick} />
        <div className="fixedMenuBuffer_top" />
        <SessionListView
          isLoaded={isLoaded}
          error={error}
          sessions={sessions}
          activePane={activePane}
          handleClick={this.handleDeleteClick}
        />
        <NewSessionForm activePane={activePane} />
        <div className="fixedMenuBuffer_bottom" />
        <MenuBottom handleClick={this.handleMenuClick} />
      </React.Fragment>
    );
  }
}

export default App;
