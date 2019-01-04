import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            connectedToBackend: false,
            loginSuccessful: false,
            errorMessage: ""
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_BACKEND_URL + "/test")
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
        fetch(process.env.REACT_APP_BACKEND_URL + "/user/login", {
            method: 'POST',
            body: json,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
          })
          .then(response => response.json().then((json) => ({json, response})))
          .then(({json, response}) => {
          if (!response.ok) {
                this.setState({ errorMessage: "Invalid username or password", loginSuccessful: false })
            }
            else {
                localStorage.setItem("token", json.token);
                this.setState({loginSuccessful: true})
                this.props.history.push('/dashboard');
            }
        },
            error => {
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
                <Link to="/register"><button>Register new user</button></Link>
                <p>{this.state.loginSuccessful ? "Login successful" : this.state.errorMessage}</p>
            </div>
        );
    }
}

export default LoginForm;