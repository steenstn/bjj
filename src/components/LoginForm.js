import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginForm.css';

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
            <div class="center">
                <p>{this.state.connectedToBackend ? "Connected" : "Connecting.."}</p>
                <form onSubmit={this.handleSubmit}>
                <TextField id="username" label="Username" name="username" type="text"/>
                <br />
                <TextField id="password" label="Password" name="password" type="password" />
                <br /><br />
                <Button variant="outlined" type="submit">Login</Button>
                </form>
                <Link to="/register">Register</Link>
                <p>{this.state.loginSuccessful ? "Login successful" : this.state.errorMessage}</p>
            </div>
        );
    }
}

export default LoginForm;