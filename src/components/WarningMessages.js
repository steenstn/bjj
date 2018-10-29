import React from 'react';
import { Message } from 'semantic-ui-react';

class WarningMessages extends React.Component {
  state = {};

  render() {
    return (
      <Segment className="warningBox" textAlign="center" basic>
        <Message positive hidden={successfulDeletion} content="Session deleted." />
      </Segment>
    );
  }
}

export default WarningMessages;
