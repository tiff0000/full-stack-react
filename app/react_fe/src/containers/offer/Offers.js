import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import DeleteOffer from './DeleteOffer';
import * as Actions from '../../store/actions/';
import Aux from '../../utils/auxiliary';
import Pagebar from '../../components/navigation/Pagebar';
import CardOffer from '../../components/box/CardOffer';

class Offers extends Component {

    componentDidMount() {
    this.props.getOffers(this.props.token);
		this.props.getUserData(this.props.token);
    }


    render () {
        let offers;
        offers = (this.props.error) ? (<p style={{textAlign: 'center'}}> {this.props.errorMsg} </p>) :
            (this.props.offers.map((offer, index) => <CardOffer key={offer._id}
                                                      offer_id={offer._id}
                                                      created_by={offer.created_by}
                                                      applicant={offer.applicant}
                                                      type={offer.type}
                                                      round={offer.round}
                                                      ticket_id={offer.ticket_id}
                                                      status={offer.status}
                                                      isOwner={this.props.usertype !== 'grad_office'}
									                                    url={this.props.match.url}
                                                      />));

        return (
            <Aux>
              <Switch>
                <Route path="/offers/:id/del" exact component={DeleteOffer} />
              </Switch>
              <Pagebar/>

              <Route path="/offers" render={ () => offers } />

            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
        userId: state.user.userId,
        usertype: state.user.usertype,
        name: state.user.name,
        offers: state.offer.offers,
        error: state.offer.error,
        errorMsg: state.offer.errorMsg
    };
};

// pass using props , this.props.onSetIssues
const mapDispatchToProps = dispatch => {
    return {
        getOffers: (token) => dispatch(Actions.getOffers(token)),
        getUserData: (token) => dispatch(Actions.getUserData(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
