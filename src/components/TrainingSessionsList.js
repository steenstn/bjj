import React from 'react';
import { List, Grid } from 'semantic-ui-react';

class TrainingSessionsList extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    sessions: [],
  };

  componentDidMount() {
    fetch('/trainingsessions')
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
  }

  render() {
    const { error, isLoaded, sessions } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <Grid centered>
        <Grid.Column width={10}>
          <List relaxed>
            {sessions.map(session => (
              <List.Item>
                <List.Content>
                  <List.Header>
                    {session.date} {session.trainingType} ({session.lengthMin} minutes){' '}
                    
                  </List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Grid.Column>
      </Grid>
    );
  }
}

export default TrainingSessionsList;
