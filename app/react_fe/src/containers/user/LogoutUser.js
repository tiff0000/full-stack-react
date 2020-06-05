import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

class LogoutUser extends Component {
    componentDidMount () {
        this.props.Logout();
    }

    render () {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Logout: () => dispatch(Actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(LogoutUser);
