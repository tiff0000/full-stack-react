import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class UnsubIssue extends Component {
    componentDidMount () {
      this.props.unsubscriptionIssue(this.props.token, this.props.issue._id);
    }

    render () {
        return <Redirect to="/issues/subscribed"/>;
    }
}

const mapStateToProps = state => {
  return {
      token: state.user.token,
      issue: state.issue.issue,
      error: state.issue.error,
      errorMsg: state.issue.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unsubscriptionIssue: (token, id) => dispatch(Actions.unsubscriptionIssue(token, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnsubIssue);
