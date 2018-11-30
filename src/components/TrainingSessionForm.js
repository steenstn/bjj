import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class TrainingSessionForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleForm = React.createRef();
        this.state = {
            lengthMin: 75,
            inputErrorLengthMin: false,
            currentDate: new Date()
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.inputErrorLengthMin) {
            return;
        }
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        var json = JSON.stringify(object);
        let token = localStorage.getItem("token");
        fetch(process.env.REACT_APP_BACKEND_URL + "/trainingsessions/new", {
            method: 'POST',
            body: json,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
          })
            .then(this.handleForm.current.reset());
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

    setDate = (date) => {
        this.setState({
            currentDate: date
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} ref={this.handleForm}>
                <label htmlFor="date">Date</label>
                <DatePicker 
                    id="date"
                    name="date"
                    selected={this.state.currentDate}
                    onChange={this.setDate}
                    dateFormat="yyy-MM-dd"/>
                <label htmlFor="length">Length(min)</label>
                <input id="lengthMin" name="lengthMin" value={this.state.lengthMin} type="text" onChange={this.handleChange} />
                <label htmlFor="trainingType">Training type</label>
                <select id="trainingType" name="trainingType">
                    <option value="GI">GI</option>
                    <option value="NO_GI">NO_GI</option>
                    <option value="OPEN_MAT">OPEN_MAT</option>
                </select>
                <button>Add session</button>
                {this.state.inputErrorLengthMin && <p style={{color: "red"}}>Oops! Length must be an integer (above 0).</p>}
            </form>
        );
    }
}

export default TrainingSessionForm;