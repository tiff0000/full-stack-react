import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../../components/form/Form';
import * as Actions from '../../store/actions/';
import checkValidity from '../../utils/validateForm';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';

class NewTicket extends Component {


    state = {
        form: {
            prof: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '', displayValue: 'Select Prof'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            type: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '', displayValue: 'Type...'},
                        {value: 'international', displayValue: 'International'},
                        {value: 'domestic', displayValue: 'Domestic'},
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }


    componentDidMount() {
      let profList = this.state.form.prof.elementConfig.options;
      this.props.users.map((user) => {if (user.usertype == 'faculty') profList.push({value: user._id, displayValue: user.name})});


      this.setState({
        form : { ...this.state.form,
          prof : { ...this.state.form.prof,
            elementConfig : { ...this.state.form.prof.elementConfig,
              options : profList }
            }}});
    }


    postHandler = ( event ) => {
        event.preventDefault();
        let session_meta = { userId : this.props.userId, name : this.props.name};
        let newForm = { status : 'granted',
          type : this.state.form.type.value,
          professor_id : this.state.form.prof.value
        }
        this.props.createTicket(this.props.token, session_meta, newForm);
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
            <form onSubmit={this.postHandler}>
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
            <Box color="secondary" header={"Grant Tickets"}>{form}</Box>
        );
    }
}
const mapStateToProps = state => {
  return {
      token: state.user.token,
      userId: state.user.userId,
      users: state.user.users,
      name: state.user.name,
      error: state.issue.error,
      errorMsg: state.issue.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
	   createTicket : (token, session, form) => dispatch(Actions.createTicket(token, session, form))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewTicket);
