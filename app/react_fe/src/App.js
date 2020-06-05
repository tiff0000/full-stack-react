import React, {Component} from 'react';
import Dashboard from './containers/dashboard/Dashboard';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from './store/actions/';

  // Issues
import Issues from './containers/issue/Issues';
  //users
import NewUser from './containers/user/CreateUser';
import LogoutUser from './containers/user/LogoutUser';
  //tickets
import Tickets from './containers/ticket/Tickets';
import Offers from './containers/offer/Offers';
class App extends Component {

  componentDidMount () {
    this.props.getSession();
  }


  render() {

    let routes;
    routes = (this.props.token) ? (<Switch>
                                    <Route path="/offers" component={Offers} />
                                    <Route path="/tickets" component={Tickets} />
                                    <Route path="/issues" component={Issues} />
                                    <Route path="/logout" exact component={LogoutUser} />
                                   </Switch>) :
                                   <Switch>
                                    <Route path="/newuser" exact component={NewUser} />
                                   </Switch>

    return (
      <Dashboard>
        {routes}
      </Dashboard> );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token
  }
};

// pass using props , this.props.onSetIssues
const mapDispatchToProps = dispatch => {
  return {
    getSession: () => dispatch(Actions.getSession())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
