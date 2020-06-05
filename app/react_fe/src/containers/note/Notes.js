import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import * as Actions from '../../store/actions/';
import SubIssue from '../issue/SubIssue';
import UnsubIssue from '../issue/UnsubIssue';
import EditNote from './EditNote';
import Chatbox from '../../components/box/Chatbox';
import Card from '../../components/box/Card';
import Box from '../../components/box/Box';

class Notes extends Component {

    state = {
      noteIndex : null,
      showSubscribe: false,
      showUnsubscribe: false
    }

    componentDidMount() {
      this.props.getIssue(this.props.token, this.props.match.params.id);
      this.props.getUsers(this.props.token);
    }


    priorityColorHandler = (priority) => {
      switch (priority) {
        case ('urgent'): return 'danger'
        case ('high'): return 'warning'
        case ('medium'): return 'dark'
        default: return 'dark'
      }
    }


    toggleSubscribeHandler = () => {
      this.setState({showSubscribe: !this.state.showSubscribe});
    }

    UnsubscribeHandler = () => {
      this.setState({showUnsubscribe: true});
      console.log("after unsubhandler");
    }

    selectNoteHandler = (index) => {
      this.setState({noteIndex: index});
    }

    unselectNoteHandler = () => {
      this.setState({noteIndex: null});
    }


    render () {

      let subscribers = (!this.props.issue) ? null :
      this.props.issue.subscribers.map((subscribers, index) => <div key={index}><small>{subscribers.name}</small></div>);

      let subscribe = (!this.state.showSubscribe) ? null :
      (<Box type="no-header"><SubIssue subscribeShow={this.state.showSubscribe} /></Box>);

      let unsubscribe = (!this.state.showUnsubscribe) ? null :
      (<UnsubIssue />);

      let error = (this.props.error) ? <h5>{this.props.errorMsg}</h5> : null;

      let issue = (this.props.issue) ? (<Card created_by={this.props.issue.created_by}
                                          created_on={new Date(this.props.issue.created_on).toDateString()}
                                          issue_id={this.props.issue._id}
                                          title={this.props.issue.title}
                                          status={this.props.issue.status}
                                          priority={this.props.issue.priority}
                                          description={this.props.issue.description}
                                          btn_clr ={((this.props.issue.status) === 'open') ? 'blue' : 'red'}
                                          header_clr={this.priorityColorHandler(this.props.issue.priority)}
                                          subscribeToggle={() => this.toggleSubscribeHandler()}
                                          unsubscribeSelect={() => this.UnsubscribeHandler()}
                                          isOwner={this.props.issue.created_by_id == this.props.userId}
                                          url={this.props.match.url}
                                          type='issue-notes' />)
                                          : null;

      let notes = (this.props.issue) ? ((this.props.issue.notes.length < 1) ? null :
         (this.props.issue.notes.map((note, index) => { return (this.state.noteIndex === index) ?
                                                      <EditNote key={note._id}
                                                       note_id={note._id}
                                                       issue_id={this.props.issue._id}
                                                       message={note.message}
                                                       created_on={new Date(note.created_on).toDateString()}
                                                       created_by={note.created_by}
                                                       select={() => this.selectNoteHandler(index)}
                                                       unselect={() => this.unselectNoteHandler()}
                                                       isOwner={note.created_by === this.props.userId}
                                                       url={this.props.match.url}/> :
                                                      <Chatbox key={note._id}
                                                       note_id={note._id}
                                                       message={note.message}
                                                       created_on={new Date(note.created_on).toDateString()}
                                                       created_by={note.created_by}
                                                       select={() => this.selectNoteHandler(index)}
                                                       isOwner={note.created_by_id === this.props.userId}
                                                       url={this.props.match.url}/> }
                                                     ))) : null;

      return (
        <Container>
            <Row>
              <Col md="4">
                {issue}
                {subscribe}
                {unsubscribe}
                <Box title='Subscribers' type='no-header'>
                  {error}
                  {subscribers}
                </Box>
              </Col>
              <Col md="8">
                {notes}
              </Col>
              </Row>
        </Container>);
    }
}

const mapStateToProps = state => {
  return {
      token: state.user.token,
      userId: state.user.userId,
      name: state.user.name,
      issue: state.issue.issue,
      subscribers: state.issue.subscribers,
      error: state.issue.error,
      errorMsg: state.issue.errorMsg
  };
};

// pass using props , this.props.onSetNotes
const mapDispatchToProps = dispatch => {
  return {
    getIssue: (token, id) => dispatch(Actions.getIssue(token, id)),
    subscribeIssue: (token, id) => dispatch(Actions.getIssue(token, id)),
    getUsers : (token) => dispatch(Actions.getUsers(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
