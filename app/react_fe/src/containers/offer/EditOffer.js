import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/';
import { Container, Row, Col } from 'reactstrap';
import Form from '../../components/form/Form';
import checkValidity from '../../utils/validateForm';
import Aux from '../../utils/auxiliary';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';

class editOffer extends Component {

  componentDidMount() {
    this.props.getOffer(this.props.token, this.props.match.params.id);
  }

  state = {
      show: true,
      form: {
          ticket_id: {
              elementType: 'select',
              elementConfig: {
                  options: [
                      {value: '', displayValue: 'Use Ticket'}
                  ]
              },
              value: '',
              validation: {},
              valid: true
          },
          applicant: {
              elementType: 'input',
              elementConfig: {
                  type: 'name',
                  placeholder: 'Applicant Name'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
          },
          round: {
              elementType: 'input',
              elementConfig: {
                  type: 'number',
                  placeholder: 'Round number'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
          },
          type: {
              elementType: 'select',
              elementConfig: {
                  options: [
                      {value: '', displayValue: 'Choose type'},
                      {value: 'domestic', displayValue: 'Domestic'},
                      {value: 'international', displayValue: 'International'}
                  ]
              },
              value: '',
              validation: {},
              valid: true
          },
          status: {
              elementType: 'select',
              elementConfig: {
                  options: [
                      {value: '', displayValue: 'sttus'},
                      {value: 'pending', displayValue: 'pending'},
                      {value: 'approved', displayValue: 'approved'}
                  ]
              },
              value: '',
              validation: {},
              valid: true
          },
      },
      formIsValid: false
  }

  closeModalHandler = () => {
    this.setState({ show: false });
    this.props.history.replace('/offers');
  }


  editOfferHandler = (event) => {
    event.preventDefault();
    let session_meta = { userId : this.props.userId, name : this.props.name};
    this.props.editOffer(this.props.token, this.props.offer._id, session_meta, this.state.form);
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
          <form onSubmit={this.editOfferHandler}>
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

      let offer = (this.props.offer) ? (<Aux><h5>Offer: ({this.props.offer.ticket_id})</h5>
                                        <h4>professor: {this.props.offer.professor}</h4>
                                        <h4>applicant: {this.props.offer.applicant}</h4>
                                        <h4>type: {this.props.offer.type}</h4>
                                        <h4>round: {this.props.offer.round}</h4>
                                        <h4>status: {this.props.offer.status}</h4></Aux>) : null



      return (<Modal show={this.state.show} close={this.closeModalHandler}>
                <Container fluid>
                  <Row>
                    <Col md="6">
                      {offer}
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
      	name: state.user.name,
      	offer: state.offer.offer,
      	error: state.offer.error,
      	errorMsg: state.offer.errorMsg
  	};
};

const mapDispatchToProps = dispatch => {
	return {
	   	getOffer : (token, id) => dispatch(Actions.getOffer(token, id)),
     	editOffer : (token, id, session, form) => dispatch(Actions.editOffer(token, id, session, form))
  	};
};

export default connect(mapStateToProps, mapDispatchToProps)(editOffer);
