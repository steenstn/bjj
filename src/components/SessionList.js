import React from 'react';
import {
  isBefore, isAfter, compareDesc, endOfToday, format,
} from 'date-fns';
import {
  Table, Loader, Icon, Grid, Segment,
} from 'semantic-ui-react';
import { isAbsolute } from 'path';

function SessionList(props) {
  const {
    activePane, error, isLoaded, sessions,
  } = props;

  if (activePane !== 'Past Training Sessions' && activePane !== 'Planned Training Sessions') {
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return (
      <Grid container className="clearFixedMenus" verticalAlign="middle" columns={16} centered>
        <Grid.Row>
          <Grid.Column width={10}>
            <Loader active inline="centered" size="massive" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  let sortedSessions = sessions.sort((a, b) => compareDesc(a.date, b.date));

  if (activePane === 'Planned Training Sessions') {
    sortedSessions = sortedSessions.filter(session => isAfter(session.date, Date.now()));
  }

  if (activePane === 'Past Training Sessions') {
    sortedSessions = sortedSessions.filter(session => isBefore(session.date, endOfToday()));
  }

  return (
    <Table className="clearFixedMenus" unstackable striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={16} textAlign="center">
            <h4>{activePane}</h4>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedSessions.length === 0 && (
          <Segment className="noSessions" tertiary textAlign="center">
            No sessions found.
          </Segment>
        )}
        {sortedSessions.map(session => (
          <Table.Row textAlign="center" key={session.id}>
            <Table.Cell>{format(session.date, 'YYYY-MM-DD')}</Table.Cell>
            <Table.Cell>{session.trainingType}</Table.Cell>
            <Table.Cell>{session.lengthMin} minutes</Table.Cell>
            <Table.Cell>
              <Icon
                name="trash alternate"
                color="red"
                onClick={props.handleClick}
                id={session.id}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default SessionList;
