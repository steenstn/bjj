import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            connectedToBackend: false
        }
    }
    componentDidMount() {
        fetch("https://bjjtraining-dev.herokuapp.com/test")
          .then(
            (result) => {
                if(result.status === 200) {
                    this.setState( {connectedToBackend: true});
                }
            }
          )
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
        fetch('https://bjjtraining-dev.herokuapp.com/user/login', {
            method: 'POST',
            body: json,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
          })
          .then(res => res.json())
          .then(
            (result) => {
              localStorage.setItem("token", result.token);
              console.log("yay", result);
              this.props.history.push('/dashboard');
            },
            (error) => {
              console.log("error", error);
            }
          );
    }

    render() {
        return(
            <div>
                <p>{this.state.connectedToBackend ? "Connected" : "Connecting.."}</p>
                <form onSubmit={this.handleSubmit}>
                <label>Username</label>
                <input id="username" name="username" type="text"/>
                <label>Password</label>
                <input id="password" name="password" type="password" />
                <button>Login</button>
                </form>
                <a href="/register"><button>Register new user</button></a>
            </div>
        );
    }
}

export default LoginForm;