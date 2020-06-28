import React from 'react';
import Link from 'next/link';
import Auth from '../../helpers/auth';

import Visual from './visual.svg';

export default function Form(Component) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				loading: false
			};
			this.handleChange = this.handleChange.bind(this);
			this.onLoginSubmit = this.onLoginSubmit.bind(this);
			this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
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

		onLoginSubmit() {
			this.setState({
				loading: true
			});

			const data = this.state;

			Auth.login(data).then(() => {});
		}

		onRegisterSubmit() {
			this.setState({
				loading: true
			});

			const data = this.state;

			Auth.register(data).then((response) => {
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
				<div className='fullPage'>
					<div className='fullPage__left'>
						<Visual />
					</div>
					<div className='fullPage__right'>
						<div className='form__wrapper'>
							<Component
								onLoginSubmit={this.onLoginSubmit}
								onRegisterSubmit={this.onRegisterSubmit}
								handleChange={this.handleChange}
								loading={this.state.loading}
								error={this.state.error}
							/>
							<Link href='/'>
								<a className='form__back'>Retourner à la page d&apos;accueil</a>
							</Link>
						</div>
					</div>
				</div>
			);
		}
	};
}
