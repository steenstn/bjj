import React, { Component } from 'react';

class RegistrationForm extends Component {
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function (value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
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
            </div>
        )
    }
}

export default RegistrationForm;