import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import styles from './Chatbox.css';
import Aux from '../../utils/auxiliary';


const chatbox = (props) => {

    let note_credentials = (props.isOwner) ? (<Aux><span style={{float: "right"}}>
                                              <Link to={props.url + '/' + props.note_id + '/del'}>
                                                <FontAwesome name='trash-o' />
                                              </Link>
                                            </span>
                                            <span onClick={props.select} style={{float: "right", paddingRight: "10px"}}>
                                              <FontAwesome name='pencil-square-o'/>
                                            </span></Aux>) : null;

    return (<ul className={styles.chat}>
              <li className={styles.chatBody}>
                <div className="header">
                    <strong>{props.created_by}</strong>
                    <small className="pull-right">
                      <FontAwesome name='clock-o' style={{paddingRight : "5px"}} />
                      {props.created_on}
                    </small>
                </div>
                {props.message}
                {note_credentials}
                {props.children}
              </li>
            </ul>)};

export default chatbox;
