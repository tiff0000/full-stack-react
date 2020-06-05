import React, {Component} from 'react';
import Form from '../../components/form/Form';
import checkValidity from '../../utils/validateForm';
import Button from '../../components/button/Button';
import * as Actions from '../../store/actions/';
import { connect } from 'react-redux';

class LoginUser extends Component {

	state = {
			form: {
					email: {
							elementType: 'input',
							elementConfig: {
									type: 'email',
									placeholder: 'Email'
							},
							value: '',
							validation: {
									required: true,
									isEmail: true
							},
							valid: false,
							touched: false
					},
					password: {
							elementType: 'input',
							elementConfig: {
									type: 'password',
									placeholder: 'Password'
							},
							value: '',
							validation: {
									required: true,
									minLength: 5
							},
							valid: false,
							touched: false
					}
			},
	}


	inputChangedHandler = ( event, authForm ) => {
			const updatedAuthForm = {
					...this.state.form,
					[authForm]: {
							...this.state.form[authForm],
							value: event.target.value,
							valid: checkValidity( event.target.value, this.state.form[authForm].validation ),
							touched: true
					}
			};
			this.setState( { form : updatedAuthForm } );
	}

	authHandler = (event) => {
		event.preventDefault();
		this.props.Auth(this.state.form.email.value, this.state.form.password.value);
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.form) {
				formElementsArray.push({
						id: key,
						config: this.state.form[key]
				});
		};
		let form = formElementsArray.map(formElement =>
								(<Form
									key={formElement.id}
									elementType={formElement.config.elementType}
									elementConfig={formElement.config.elementConfig}
									value={formElement.config.value}
									invalid={!formElement.config.valid}
									shouldValidate={formElement.config.validation}
									touched={formElement.config.touched}
									changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
						));
		return (
				<form onSubmit={this.authHandler}>
					{form}
					<Button type={'disabled-stretch'}>Submit</Button>
				</form>
		);
	}
}

const mapDispatchToProps = dispatch => {
  return {
		Auth: (email, password) => dispatch(Actions.auth(email, password))
  };
};

export default connect(null, mapDispatchToProps)(LoginUser);
