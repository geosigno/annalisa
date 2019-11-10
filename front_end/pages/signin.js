import React from 'react';

import Auth from '../components/auth';
import SignInForm from '../components/form/signin-form';

const auth = new Auth();

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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

	onSubmit() {
		this.setState({
			loading: true
		});

		const data = this.state;
		// auth.login(data);

		auth.login(data).then((response) => {
			console.log(response);
		});
	}

	render() {
		return <SignInForm onSubmit={this.onSubmit} handleChange={this.handleChange} loading={this.state.loading} />;
	}
}
export default SignIn;
