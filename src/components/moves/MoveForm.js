import React, { Component } from 'react';

class MoveForm extends Component {
    constructor(props) {
        super(props);
        this.handleForm = React.createRef();

    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log("data", data);
        var object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        console.log("json", json);
        var json = JSON.stringify(object);
        let token = localStorage.getItem("token");
        fetch(process.env.REACT_APP_BACKEND_URL + "/moves/new", {
            method: 'POST',
            body: json,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
            })
            .then(res => res.json())
            
            .then(this.handleForm.current.reset());
    }

    render = () => {
        return (<form onSubmit={this.handleSubmit} ref={this.handleForm}>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" />
                    <label htmlFor="description">Description</label>
                    <input id="description" name="description" type="text" />
                    <button>Add move</button>
                </form>);

    }
}

export default MoveForm;