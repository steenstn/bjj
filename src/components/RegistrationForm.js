import React, { Component } from 'react';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            registrationSuccessful: false,
            errorMessage: ""
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function (value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        fetch(process.env.REACT_APP_BACKEND_URL + "/user/register", {
            method: 'POST',
            body: json,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(response => response.json().then((json) => ({json, response})))
            .then(({json, response}) => {
                if (!response.ok) {
                    this.setState({ errorMessage: json.message, registrationSuccessful: false })
                }
                else {
                    this.setState({ registrationSuccessful: true })
                }
            },
            error => {
                    console.log("error", error);
                  }
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input id="username" name="username" type="text"/>
                    <label>Password</label>
                    <input id="password" name="password" type="password" />
                    <button>Register</button>
                </form>
                <p>{this.state.registrationSuccessful ? "Registration successful" : this.state.errorMessage}</p>
            </div>
        )
    }
}

export default RegistrationForm;