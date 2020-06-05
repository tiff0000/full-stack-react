import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import Form from '../../components/form/Form';
import checkValidity from '../../utils/validateForm';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';

class NewUser extends Component {

    state = {
        form: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'name',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
										minLength: 5
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
						},
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            usertype: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '', displayValue: 'Choose your Occupation', default: true},
                        {value: 'faculty', displayValue: 'Faculty'},
                        {value: 'budget_office', displayValue: 'Budget Office'},
                        {value: 'grad_office', displayValue: 'Grad Office'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }

        },
        formIsValid: false,
    }

    createUserHandler = (event) => {
      event.preventDefault();
      this.props.newUser(this.state.form);
      this.props.history.replace('/');
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedform = {
            ...this.state.form
        };
        const updatedFormElement = {
            ...updatedform[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedform[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedform) {
            formIsValid = updatedform[inputIdentifier].valid && formIsValid;
        }
        this.setState({form: updatedform, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            });
        }
        let form = (
            <form onSubmit={this.createUserHandler}>
                {formElementsArray.map(formElement => (
                    <Form
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button disabled={!this.state.formIsValid} type={'disabled-stretch'}>Register</Button>
            </form>
        );
        return (
            <Box color="secondary" header={"Create new Users"}>{form}</Box>
        );
    }
}

const mapDispatchToProps = dispatch => {
  return {
	   newUser : (form) => dispatch(Actions.newUser(form))
  };
};

export default connect(null, mapDispatchToProps)(NewUser);
