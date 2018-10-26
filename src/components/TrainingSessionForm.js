import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

class TrainingSessionForm extends React.Component {
  state = {
    date: '',
    lengthMin: '',
    trainingType: '',
    invalid: false,
    success: false,
    warningList: [],
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value }, () => {
    // Validation

    const warningList = [];
    if (this.state.date.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) === null) {
      warningList.push('Date must be in YYYY-MM-DD format');
    }

    if (Number.parseInt(this.state.lengthMin, 10) < 1 || isNaN(this.state.lengthMin)) {
      warningList.push('Training length must be more than 0 minutes');
    }

    const validTrainingTypes = ['GI', 'NO_GI', 'OPEN_MAT'];

    if (!validTrainingTypes.includes(this.state.trainingType)) {
      warningList.push(
        `Training type must be one of the following: ${validTrainingTypes.join(', ')}`,
      );
    }

    this.setState({
      invalid: warningList.length > 0,
      success: warningList.length === 0,
      warningList,
    });
  });

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.invalid) {
      return null;
    }

    const { date, lengthMin, trainingType } = this.state;

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
      valid: true,
    }));
  };

  render() {
    return (
      <Form warning={this.state.invalid} success={this.state.success} onSubmit={this.handleSubmit}>
        <Form.Input
          placeholder="Enter date"
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder="Enter training length"
          name="lengthMin"
          value={this.state.lengthMin}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder="Enter training type"
          name="trainingType"
          value={this.state.trainingType}
          onChange={this.handleChange}
        />
        <Message warning list={this.state.warningList} />
        <Message success content="Successfully added new training log entry!" />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default TrainingSessionForm;
