import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class DeleteTicket extends Component {
    componentDidMount () {
      this.props.deleteTicket(this.props.token, this.props.match.params.id, this.props.userId);
    }

    render () {
        return <Redirect to="/tickets"/>;
    }
}

const mapStateToProps = state => {
  return {
      token: state.user.token,
      userId: state.user.userId,
      error: state.ticket.error,
      errorMsg: state.ticket.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTicket: (token, id) => dispatch(Actions.deleteTicket(token, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTicket);
