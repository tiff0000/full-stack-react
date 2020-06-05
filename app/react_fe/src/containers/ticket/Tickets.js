import React, { Component } from 'react';
import {connect} from "react-redux";
import { Route, Switch } from 'react-router-dom';
import * as Actions from "../../store/actions";
import EditTicket from './EditTicket';
import Pagebar from '../../components/navigation/Pagebar';
import CardTicket from '../../components/box/CardTicket';
import Aux from '../../utils/auxiliary';


class Tickets extends Component {

    componentDidMount() {
      	this.props.getUserData(this.props.token);
		    this.props.getTickets(this.props.token);
        this.props.getUsers(this.props.token);
    };



    render () {

      let myTickets = (this.props.error2) ? (<p style={{textAlign: 'center'}}> {this.props.errorMsg2} </p>) :
               (this.props.subTickets.map((ticket, index) => <CardTicket key={ticket._id}
                 professor={ticket.professor_id}
                 status={ticket.status}
                 type={ticket.type}
                 created_on={new Date(ticket.created_on).toDateString()}
                 isOwner={ticket.created_by_id == this.props.userId}
                 ticket_id={ticket._id}
                 url={this.props.match.url}
                 />))





      let grantedTickets = (this.props.error) ? (<p style={{textAlign: 'center'}}> {this.props.errorMsg} </p>) :
               (this.props.tickets.map((ticket, index) => <CardTicket key={ticket._id}
                 professor={ticket.professor_id}
                 status={ticket.status}
                 type={ticket.type}
                 created_on={new Date(ticket.created_on).toDateString()}
                 isOwner={ticket.created_by_id == this.props.userId}
                 ticket_id={ticket._id}
                 url={this.props.match.url}
                 />))


      return (
            <Aux>
              <Switch>
                <Route path="/tickets/granted/:id/edit" exact component={EditTicket} />
              </Switch>
              <Pagebar/>
              <Route path="/tickets" exact render={ () => myTickets } />
	            <Route path="/tickets/granted" render={ () => grantedTickets } />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
        userId: state.user.userId,
        name: state.user.name,
        tickets: state.ticket.tickets,
        subTickets: state.user.subTickets,
        error: state.ticket.error,
        errorMsg: state.ticket.errorMsg,
        error2: state.user.error,
        errorMsg2: state.user.errorMsg
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getUsers: (token) => dispatch(Actions.getUsers(token)),
        getUserData: (token) => dispatch(Actions.getUserData(token)),
		    getTickets: (token) => dispatch(Actions.getTickets(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
