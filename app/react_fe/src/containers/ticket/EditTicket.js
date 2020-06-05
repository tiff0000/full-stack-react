import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/';
import { Container, Row, Col } from 'reactstrap';
import Form from '../../components/form/Form';
import checkValidity from '../../utils/validateForm';
import Aux from '../../utils/auxiliary';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';

class editTicket extends Component {

  state = {
      show: true,
      form: {
        status: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: '', displayValue: 'Choose:'},
                    {value: 'granted', displayValue: 'Granted'},
                    {value: 'redeemed', displayValue: 'Redeemed'},
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
                    {value: '', displayValue: 'Choose:'},
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
    this.props.getTicket(this.props.token, this.props.match.params.id);
  }

  closeModalHandler = () => {
    this.setState({ show: false });
    this.props.history.replace('/tickets/granted');
  }

  editTicketHandler = (event) => {
    event.preventDefault();
    let session_meta = { userId : this.props.userId, name : this.props.name};
    let editForm = { status : this.state.form.status.value,
      type : this.state.form.type.value,
      professor_id : this.props.ticket.professor_id
    }
    this.props.editTicket(this.props.token, this.props.match.params.id, session_meta, editForm);
    this.closeModalHandler();
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
          <form onSubmit={this.editTicketHandler}>
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
              <Button disabled={!this.state.formIsValid} type={'disabled-stretch'}>Update</Button>
          </form>
      );

      let ticket = (this.props.ticket) ? (<Aux><h5>Ticket: ({this.props.ticket._id})</h5>
                                          <h4>status: {this.props.ticket.status}</h4>
                                          <h4>type: {this.props.ticket.type}</h4></Aux>) : null



      return (<Modal show={this.state.show} close={this.closeModalHandler}>
                <Container fluid>
                  <Row>
                    <Col md="6">
                      {ticket}
                    </Col>
                    <Col md="6">
                      {form}
                    </Col>
                  </Row>
                </Container>
              </Modal>);
    }
}
const mapStateToProps = state => {
  return {
      token: state.user.token,
      userId: state.user.userId,
      users: state.user.users,
      name: state.user.name,
      ticket: state.ticket.ticket,
      error: state.ticket.error,
      errorMsg: state.ticket.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
	   getTicket : (token, id) => dispatch(Actions.getTicket(token, id)),
     editTicket : (token, id, session, form) => dispatch(Actions.editTicket(token, id, session, form))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(editTicket);
