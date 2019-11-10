import React from 'react';
import Auth from '../components/auth';
import SignUpForm from '../components/form/signup-form';

const auth = new Auth();

class SignUp extends React.Component {
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

		auth.register(data).then((response) => {
			if (response.status === 400) {
				if (response.data.message[0].messages[0].id === 'Auth.form.error.email.taken') {
					this.setState({
						error: 'Il semble que cet e-mail est déjà utilisé. Veuillez vous connectez ou utiliser un autre e-mail',
						loading: false
					});
				}
			}
		});
	}

	render() {
		return (
			<SignUpForm
				onSubmit={this.onSubmit}
				handleChange={this.handleChange}
				loading={this.state.loading}
				error={this.state.error}
			/>
		);
	}
}
export default SignUp;
