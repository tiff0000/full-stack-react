import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions/';
import Form from '../../components/form/Form';
import checkValidity from '../../utils/validateForm';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';

class NewOffer extends Component {

    state = {
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
                    placeholder: 'Applicant'
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
            }
        },
        formIsValid: false
    }

    componentDidMount() {
      let ticketList = this.state.form.ticket_id.elementConfig.options;
      this.props.tickets.map((ticket) => {if (ticket.status == 'granted') return ticketList.push({value: ticket._id, displayValue: ticket._id})});

      this.setState({
        form : { ...this.state.form,
          ticket_id : { ...this.state.form.ticket_id,
            elementConfig : { ...this.state.form.ticket_id.elementConfig,
              options : ticketList }
            }}});
    }


    postHandler = ( event ) => {
      event.preventDefault();
    	let session_meta = { userId : this.props.userId, name : this.props.name};
      let newForm = { status : 'pending',
        type : this.state.form.type.value,
        round : this.state.form.round.value,
        applicant : this.state.form.applicant.value
      }
    	this.props.createOffer(this.props.token, session_meta, newForm);
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
            <Box color="secondary" header={"Create new Offer"}>{form}</Box>
        );
    }
}
const mapStateToProps = state => {
  return {
      token: state.user.token,
      userId: state.user.userId,
      name: state.user.name,
      tickets: state.user.subTickets,
      error: state.issue.error,
      errorMsg: state.issue.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
	   createOffer : (token, session, form) => dispatch(Actions.createOffer(token, session, form))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOffer);
