import React from 'react';
import {
  Table, Grid, Segment, Label,
} from 'semantic-ui-react';

class PastSessionsView extends React.Component {
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
    if (!this.props.visible) {
      return null;
    }
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Table unstackable striped color="blue">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan={16} textAlign="center">
                  Past Training Sessions
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {sessions.map(session => (
              <Table.Row>
                <Table.Cell>{session.date}</Table.Cell>
                <Table.Cell textAlign="center">{session.trainingType}</Table.Cell>
                <Table.Cell>{session.lengthMin} minutes</Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default PastSessionsView;
