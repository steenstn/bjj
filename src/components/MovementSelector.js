import React from 'react';
import { Grid } from 'semantic-ui-react';

import MoveToggleButton from './MoveToggleButton';

class MovementSelector extends React.Component {
  state = {};

  render() {
    if(!this.props.visible) {
      return null
    }

    const movementsList = this.props.movements.map(e => <MoveToggleButton movement={e} />);

    return (
      <Grid.Row centered>
        <Grid.Column textAlign="center">
          {movementsList}
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default MovementSelector;
