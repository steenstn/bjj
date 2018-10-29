import React from 'react';
import {
  Form, Message, Grid, Input, Select, Label,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './NewSessionForm.css';

class NewSessionForm extends React.Component {
  state = {
    date: moment(),
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

  handleDateChange = (selected) => {
    this.setState({ date: selected });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value }, () => {
    // Validation

    const { lengthMin } = this.state;

    const warningList = [];

    if (Number.parseInt(lengthMin, 10) < 1 || isNaN(lengthMin)) {
      warningList.push('Training length must a be number greater than zero.');
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

    const id = toString(Math.floor(Math.random() * 1000));

    const json = JSON.stringify({
      id, date, lengthMin, trainingType,
    });

    fetch('/trainingsessions/new', {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then(() => this.setState({
      date: moment(),
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

    const { activePane } = this.props;

    if (activePane !== 'New Session Form') {
      return null;
    }

    return (
      <Grid container className="clearFixedMenus" verticalAlign="middle" columns={16} centered>
        <Grid.Row>
          <Grid.Column width={10}>
            <Form warning={invalid}>
              <div className="field">
                <label>Date</label>
                <DatePicker
                  dateFormat="YYYY/MM/DD"
                  selected={date}
                  onChange={this.handleDateChange}
                />
              </div>
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
              <Form.Button
                className="confirmSession"
                compact
                color="green"
                size="small"
                type="submit"
                onClick={this.handleSubmit}
              >
                Confirm
              </Form.Button>
              <Message warning list={warningList} />
              <Message success content="New training log entry added!" hidden={!success} />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default NewSessionForm;
