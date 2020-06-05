import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class DeleteIssue extends Component {
    componentDidMount () {
      this.props.deleteIssue(this.props.token, this.props.match.params.id);
    }

    render () {
        return <Redirect to="/issues"/>;
    }
}

const mapStateToProps = state => {
  return {
      token: state.user.token,
      error: state.issue.error,
      errorMsg: state.issue.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteIssue: (token, id) => dispatch(Actions.deleteIssue(token, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteIssue);
