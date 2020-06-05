import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class DeleteOffer extends Component {
    componentDidMount () {
      this.props.deleteOffer(this.props.token, this.props.match.params.id);
    }

    render () {
        return <Redirect to="/offers"/>;
    }
}

const mapStateToProps = state => {
  return {
      token: state.user.token,
      error: state.offer.error,
      errorMsg: state.offer.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteOffer: (token, id) => dispatch(Actions.deleteOffer(token, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteOffer);
