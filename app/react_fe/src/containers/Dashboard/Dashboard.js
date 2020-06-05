// Config
import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
  //users
import LoginUser from "../user/LoginUser";
import User from '../user/User';
import NewIssue from '../issue/NewIssue';
import NewTicket from '../ticket/NewTicket';
import NewOffer from '../offer/NewOffer';
import NewNote from '../note/NewNote';
// Styles + Utils + components
import { Container, Row, Col } from 'reactstrap';
import Nav from '../../components/navigation/Nav';
import Aux from '../../utils/auxiliary';
import Popover from 'react-popover';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';

class Dashboard extends Component {



    state = { open: false };

    handleClose(e) { this.setState({ open:false })};
    handleClickLogin(e) { this.setState({ open: true })};
    render() {

    let popoverContent = <div style={{width: "500px"}} ><Box header={'Log in'} color={'primary'}><LoginUser/></Box></div>;

    const popoverProps = {
        key : 1,
        isOpen: this.state.open,
        preferPlace: 'below',
        place: 'below',
        onOuterAction: () => this.handleClose(),
        body: popoverContent
    };
    let navButton;
    navButton = (this.props.token) ? (<Link to='/logout'><Button type="default">Log Out</Button></Link>)
                                    :(<Popover {...popoverProps}>
                                        <Button type="default" clicked={this.handleClickLogin.bind(this)}>Login</Button>
                                      </Popover>)

      return (
        <Aux>
        <Nav token={this.props.token}> {navButton} </Nav>
        <Container fluid>
          <Row>
            <Col sm="7" md="7">
              {this.props.children}
            </Col>
            <Col sm="5" md="5">
              <User />
              <Switch>
                <Route path="/issues/:id/notes" component={NewNote} />
                <Route path="/issues" component={NewIssue} />
                <Route path="/tickets/granted/new" exact component={NewTicket} />
                <Route path="/offers/new" exact component={NewOffer} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Aux>
      );
  }
}
const mapStateToProps = state => {
  return {
      token : state.user.token
  };
};



export default connect(mapStateToProps, null)(Dashboard);
