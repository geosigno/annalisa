import React from 'react';

import { TextField } from '@material-ui/core';

import Auth from './../components/auth';
const auth = new Auth();

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;

        this.setState((prevState) => {
            return {
                ...prevState.contact,
                [key]: value
            };
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const data = this.state;

        auth.register(data);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField id="username" label="nom" onChange={this.handleChange} />
                <TextField id="email" label="email" onChange={this.handleChange} />
                <TextField id="password" type="password" label="password" onChange={this.handleChange} />
                <button type="submit">s'enregistrer</button>
            </form>
        );
    }
}
export default SignUp;
