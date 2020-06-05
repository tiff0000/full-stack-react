import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class DeleteNote extends Component {

    componentDidMount () {
      this.props.deleteNote(this.props.token, this.props.match.params.id, this.props.match.params.noteId);
    }

    render () {
        return <Redirect to={'/issues/' + this.props.match.params.id + '/notes'} />;
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
    deleteNote: (token, issueId, noteId) => dispatch(Actions.deleteNote(token, issueId, noteId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteNote);
