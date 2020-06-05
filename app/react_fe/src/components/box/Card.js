import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import FontAwesome from 'react-fontawesome';
import { Container, Col, Row, Card, CardHeader, CardBody, CardFooter, Badge } from 'reactstrap';


const card = (props) => {

  let issueOwnerOpts = (props.isOwner) ? (<CardBody>
                                            <Link to={props.url + '/' + props.issue_id + '/edit'}>
                                              <Button type={props.btn_clr}>Status:{props.status}</Button>
                                            </Link>
                                            <Link to={props.url + '/' + props.issue_id + '/del'}>
                                              <FontAwesome name='trash-o' size='2x' style={{float: 'right', paddingLeft: '10px'}} />
                                            </Link>
                                            <Link to={props.url + '/' + props.issue_id + '/notes'}>
                                              <FontAwesome name='comments-o' size='2x' style={{float: 'right'}} />
                                            </Link>
                                          </CardBody>) :
                                          (<CardBody>
                                            <Button type={props.btn_clr}>Status:{props.status}</Button>
                                            <Link to={props.url + '/' + props.issue_id + '/notes'}>
                                              <FontAwesome name='comments-o' size='2x' style={{float: 'right'}} />
                                            </Link>
                                          </CardBody>)


  let issueNotesOwnerOpts = (props.isOwner) ? (<Row>
                                                <Col sm="5" md="5" />
                                                <Col sm="2" md="2">
                                                  <span onClick={props.subscribeToggle}>
                                                    <FontAwesome name='user-plus' />
                                                  </span>
                                                </Col>
                                                <Col sm="2" md="2">
                                                  <Link to={props.url + '/edit'}>
                                                    <FontAwesome name='pencil-square-o'/>
                                                  </Link>
                                                </Col>
                                                <Col sm="2" md="2">
                                                  <Link to={props.url + '/del'}>
                                                    <FontAwesome name='trash-o' />
                                                  </Link>
                                                </Col>
                                              </Row>) :
                                              (<Row>
                                                <Col sm="10" md="10" />
                                                <Col sm="2" md="2">
                                                  <span onClick={props.unsubscribeSelect}>
                                                    <FontAwesome name='user-times' />
                                                  </span>
                                                </Col>
                                              </Row>)

  switch (props.type) {
    case ( 'issues' ):
      return (<section style={{"paddingBottom" : "10px"}}>
                  <Card style={{"borderColor" : "black"}}>
                      <CardHeader>
                        <Badge color='dark' style={{float: 'left'}}>{props.created_on}</Badge>
                        <Badge color={props.header_clr} style={{float: 'right'}}>Priority: {props.priority}</Badge>
                        <span style={{paddingLeft:"10px"}}>{props.title}</span>
                      </CardHeader>
                      {issueOwnerOpts}
                  </Card>
                </section>);

    case ( 'issue-notes' ):
      return (<section style={{"paddingBottom" : "10px"}}>
                <Card style={{"borderColor" : "black"}}>
                  <CardBody>
                    <Container>
                      <Row>
                        <h5>{props.title} - {props.created_by}</h5>
                      </Row>
                      <Row style={{"paddingBottom" : "5px"}}>
                        <Badge color={props.header_clr}>Priority: {props.priority}</Badge>
                      </Row>
                      <Row style={{"paddingBottom" : "5px", "color" : props.btn_clr }}>
                        STATUS: {props.status}
                      </Row>
                      <Row style={{"paddingBottom" : "5px"}}>
                        {props.created_on}
                      </Row>
                      <Row style={{"paddingBottom" : "5px"}}>
                        {props.description}
                      </Row>
                    </Container>
                  </CardBody>
                  <CardFooter>
                    <Container>
                      {issueNotesOwnerOpts}
                    </Container>
                  </CardFooter>
                </Card>
              </section>);

    case ( 'issue-sub' ):
      return (<section style={{"paddingBottom" : "10px"}}>
                  <Card style={{"borderColor" : "black"}}>
                      <CardBody>
                        <h5>Subscribers</h5>
                      </CardBody>
                  </Card>
                </section>);
    default:
      return (<h2>DEFAULT: NEED TO SPECIFY TYPE</h2>);
    }
};

export default card;
