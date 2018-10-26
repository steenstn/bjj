import React from 'react';
import {
  Button, Form, Message, Grid, Input, Select, Divider,
} from 'semantic-ui-react';

import TrainingSessionsList from './TrainingSessionsList';

class TrainingSessionForm extends React.Component {
  state = {
    date: '',
    lengthMin: '',
    trainingType: '',
    invalid: false,
    success: false,
    warningList: [],
  };

  validTrainingTypes = [
    { text: 'GI', value: 'GI' },
    { text: 'NO_GI', value: 'NO_GI' },
    { text: 'OPEN_MAT', value: 'OPEN_MAT' },
  ];

  handleChange = (e, { name, value }) => this.setState({ [name]: value }, () => {
    // Validation

    const { date, lengthMin } = this.state;

    const warningList = [];
    if (date.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) === null) {
      warningList.push('Date must be in YYYY-MM-DD format.');
    }

    if (Number.parseInt(lengthMin, 10) < 1 || isNaN(lengthMin)) {
      warningList.push('Training length must be more than 0 minutes.');
    }

    this.setState({
      invalid: warningList.length > 0,
      warningList,
    });
  });

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      date, lengthMin, trainingType, invalid,
    } = this.state;

    if (invalid) {
      return null;
    }

    const json = JSON.stringify({ date, lengthMin, trainingType });

    fetch('/trainingsessions/new', {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then(() => this.setState({
      date: '',
      lengthMin: '',
      trainingType: '',
      invalid: false,
      success: true,
    }));
  };

  render() {
    const {
      invalid, success, date, lengthMin, trainingType, warningList,
    } = this.state;

    return (
      <React.Fragment>
        <Form size="small" warning={invalid} success={success} onSubmit={this.handleSubmit}>
          <Grid container>
            <Grid.Row centered>
              <Grid.Column width={10} textAlign="center">
                <Form.Field
                  fluid
                  control={Input}
                  placeholder="Enter date"
                  name="date"
                  value={date}
                  onChange={this.handleChange}
                />
                <Form.Field
                  fluid
                  control={Input}
                  placeholder="Enter training length"
                  name="lengthMin"
                  value={lengthMin}
                  onChange={this.handleChange}
                />
                <Form.Field
                  fluid
                  control={Select}
                  placeholder="Select training type"
                  name="trainingType"
                  options={this.validTrainingTypes}
                  value={trainingType}
                  onChange={this.handleChange}
                />
                <Button primary size="small" type="submit">
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Message warning list={warningList} />
              <Message success content="New training log entry added!" />
            </Grid.Row>
          </Grid>
        </Form>
        <Divider />
        <TrainingSessionsList />
      </React.Fragment>
    );
  }
}

export default TrainingSessionForm;
