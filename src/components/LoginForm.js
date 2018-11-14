import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class LoginForm extends Component {
    render() {
        return (<Link to="/dashboard">Login</Link> );
    }
}

export default LoginForm;