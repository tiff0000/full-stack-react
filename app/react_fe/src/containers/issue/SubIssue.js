import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/';
import Form from '../../components/form/Form';
import Aux from '../../utils/auxiliary';
import checkValidity from '../../utils/validateForm';
import Button from '../../components/button/Button';

class subIssue extends Component {

  state = {
      form: {
        user: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: '', displayValue: 'Select User'}
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

  componentDidMount() {
    let userList = this.state.form.user.elementConfig.options;
    this.props.users.map((user) => {
      if (!(this.props.issue.created_by_id === user._id) && !(this.arrayFilter(this.props.issue.subscribers, user._id)))
      userList.push({value: user._id, displayValue: user.name})});
    this.setState({ form : { user : { ...this.state.form.user, elementConfig : { options : userList }}}});
  }


  arrayFilter = (array, target) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id == target) {
          return true;
      }
    }
    return false;
  }

  subIssueHandler = (event) => {
    event.preventDefault();
    this.props.subscriptionIssue(this.props.token, this.props.issue._id, this.state.form.user.value);
  }

  unsubIssueHandler = (event) => {
    event.preventDefault();
    this.props.unsubscriptionIssue(this.props.token, this.props.issue._id);
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
          <form onSubmit={this.subIssueHandler}>
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
              <Button disabled={!this.state.formIsValid} type={'disabled-dark-small'}>Subscribe</Button>
          </form>
      );


      return (<Aux>{form}</Aux>);
    }
}
const mapStateToProps = state => {
  return {
      token: state.user.token,
      userId: state.user.userId,
      users: state.user.users,
      issue: state.issue.issue,
      error: state.issue.error,
      errorMsg: state.issue.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
     subscriptionIssue : (token, issueId, userId) => dispatch(Actions.subscriptionIssue(token, issueId, userId)),
     unsubscriptionIssue : (token, issueId) => dispatch(Actions.unsubscriptionIssue(token, issueId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(subIssue);
