import React from 'react';
import Auth from '../components/auth';
import SignInForm from '../components/form/signin-form';

const auth = new Auth();

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const key = e.target.id;
        const { value } = e.target;

        this.setState((prevState) => {
            return {
                ...prevState.contact,
                [key]: value
            };
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        const data = this.state;
        auth.login(data);
    }

    render() {
        return <SignInForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} loading={this.state.loading} />;
    }
}
export default SignIn;
