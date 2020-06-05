import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/';
import Form from '../../components/form/Form';
import checkValidity from '../../utils/validateForm';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';

class NewIssue extends Component {

    state = {
        form: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
            },
            priority: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '', displayValue: 'Select a priority'},
                        {value: 'urgent', displayValue: 'Urgent'},
                        {value: 'high', displayValue: 'High'},
                        {value: 'medium', displayValue: 'Medium'},
                        {value: 'low', displayValue: 'Low'}
                    ]
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false
            }
        },
        formIsValid: false,
    }

    createIssueHandler = (event) => {
      event.preventDefault();
      let session_meta = { userId : this.props.userId, name : this.props.name};
      this.props.createIssue(this.props.token, session_meta, this.state.form);
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
            <form onSubmit={this.createIssueHandler}>
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
                <Button disabled={!this.state.formIsValid} type={'disabled-stretch'}>Submit</Button>
            </form>
        );
        return (
            <Box color="secondary" header={"Create new Issues"}>{form}</Box>
        );
    }
}
const mapStateToProps = state => {
  return {
      token: state.user.token,
      userId: state.user.userId,
      name: state.user.name,
      error: state.issue.error,
      errorMsg: state.issue.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
	   createIssue : (token, session, form) => dispatch(Actions.createIssue(token, session, form))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewIssue);
