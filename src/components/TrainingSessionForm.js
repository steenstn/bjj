import React, { Component } from 'react';

class TrainingSessionForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleForm = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function(value, key){
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
          })
            .then(alert("Traning session successfully added!"))
            .then(this.handleForm.current.reset());
        

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} ref={this.handleForm}>
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="text"/>
            <label htmlFor="length">Length(min)</label>
            <input id="lengthMin" name="lengthMin" type="text" />
            <label htmlFor="trainingType">Training type</label>
            <input id="trainingType" name="trainingType" type="text" />
            <button>Add session</button>
            </form>
        );
    }
    
}

export default TrainingSessionForm;