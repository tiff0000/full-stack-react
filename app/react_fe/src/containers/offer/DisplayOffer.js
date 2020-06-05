import React, { Component } from 'react';
import Aux from '../../utils/auxiliary';
import Card from '../../components/box/Card';

class displayOffer extends Component {
    render () {
        let output = null;

        switch ( this.props.type ) {
            case ( 'short' ):
                output = (
                    <Aux>
                        <h2>Offer for {this.props.applicant_id}</h2>
                        <h5>Ticket ID: {this.props.ticket_id}</h5>
                        <h5>Status: {this.props.status}</h5>
                        <h5>Professor: {this.props.professor_id}</h5>
			            <h5>Type: {this.props.ap_type}</h5>
                        <h5>Round number: {this.props.round}</h5>
                    </Aux>
                );
                break;
            case ( 'modal-full' ):
                output = (
                    <Aux onClick={this.props.select}>
                        <h2>Offer for: {this.props.applicant_id}</h2>
                        <h5>Ticket ID: {this.props.ticket_id}</h5>
                        <h5>Round number: {this.props.round}</h5>
                        <h5>Professor {this.props.professor_id}</h5>
                        <h5>Status: {this.props.status}</h5>
                        <h5>type: {this.props.ap_type}</h5>
                    </Aux>
                );
                break;
            default:
                output = (
                    <Card
                        ticket_id={this.props.ticket_id}
                        professor_id={this.props.professor_id}
                        round={this.props.round}
                        select={this.props.select}
                        status={this.props.status}
                        btn_clr={this.props.status_clr}
                        header_clr={this.props.priority_clr}
                    />
                );
        }

        return output;
    }
}

export default displayOffer;
