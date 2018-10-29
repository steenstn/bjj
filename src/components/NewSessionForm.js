import React from 'react';
import {
  Button, Form, Message, Grid, Input, Select, Icon,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './NewSessionForm.css';

import MovementSelector from './MovementSelector';

import movements from '../MockMovements';

class NewSessionForm extends React.Component {
  state = {
    date: '',
    lengthMin: '',
    trainingType: '',
    invalid: false,
    success: false,
    warningList: [],
    startDate: moment(),
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
      invalid, success, date, lengthMin, trainingType, warningList, startDate,
    } = this.state;

    if (!this.props.visible) {
      return null;
    }

    return (
      <Grid.Row>
        <Grid.Column width={10}>
          <Form size="small">
            <DatePicker
              style={{ marginBottom: '1rem' }}
              customInput={<Form.Field label="Date" control={Input} />}
              dateFormat="YYYY/MM/DD"
              selected={startDate}
              onChange={this.handleChange}
            />
            <Form.Field
              label="Training Time"
              control={Input}
              placeholder="e.g. 30 minutes"
              name="lengthMin"
              value={lengthMin}
              onChange={this.handleChange}
            />
            <Form.Field
              label="Training Type"
              control={Select}
              placeholder="Select Training Type"
              name="trainingType"
              options={this.validTrainingTypes}
              value={trainingType}
              onChange={this.handleChange}
            />
            <Form.Button className="confirmSession" compact color="green" size="small" type="submit">
              Confirm
            </Form.Button>
            <Message warning list={warningList} hidden={!invalid} />
            <Message success content="New training log entry added!" hidden={!success} />
          </Form>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default NewSessionForm;
