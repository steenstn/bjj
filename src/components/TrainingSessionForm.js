import React, { Component } from 'react';

class TrainingSessionForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            lengthMin: 75,
            inputErrorLengthMin: false
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        var json = JSON.stringify(object);
        let token = localStorage.getItem("token");
        fetch('https://bjjtraining-dev.herokuapp.com/trainingsessions/new', {
            method: 'POST',
            body: json,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
        });
    }

    handleChange = (event) => {
        event.preventDefault();
        let input = event.target.value;
        if (!(/^(|[1-9][0-9]*)$/.test(input)) && input !== "") {
            this.setState({ inputErrorLengthMin: true })
        } else {
            this.setState({ inputErrorLengthMin: false })
        }
        this.setState({ lengthMin: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="date">Date</label>
                <input id="date" name="date" type="text" />
                <label htmlFor="length">Length(min)</label>
                <input id="lengthMin" name="lengthMin" placeholder={this.state.lengthMin} type="text" onChange={this.handleChange} />
                {this.state.inputErrorLengthMin && <p>Oops! Length must be an integer (above 0).</p>}
                <label htmlFor="trainingType">Training type</label>
                <select id="trainingType" name="trainingType">
                    <option value="GI">GI</option>
                    <option value="NO_GI">NO_GI</option>
                    <option value="OPEN_MAT">OPEN_MAT</option>
                </select>
                <button>Add session</button>
            </form>
        );
    }
}

export default TrainingSessionForm;