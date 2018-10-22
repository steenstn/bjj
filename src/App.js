import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sessions: []
    };
  }

  componentDidMount() {
    fetch("https://bjjtraining.herokuapp.com/trainingsessions")
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
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, sessions } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {sessions.map(session => (
            <li>
              {session.id} {session.date} {session.trainingType} {session.lengthMin}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default App;
