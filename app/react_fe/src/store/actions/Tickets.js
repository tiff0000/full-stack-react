import * as actionTypes from '../../utils/actionTypes';
import axios from 'axios';
import { grantTicket } from './User';

const setTickets = (tickets) => {
  return {
    type: actionTypes.SET_TICKETS,
    error: false,
    tickets: tickets
  };
};

const setTicketsFail = (errorMsg) => {
  return {
    type: actionTypes.SET_TICKETS_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const getTickets = (token) => {
  return async dispatch => {
    try {
      const header = {
        headers: { 'x-auth-token': token }
      }
      const res = await axios.get('/tickets', header);
      dispatch(setTickets(res.data));

    } catch (error) {
      dispatch(setTicketsFail(error.message));
    };
  };
};

const setTicket = (ticket) => {
  return {
    type: actionTypes.SET_TICKET,
    error: false,
    ticket: ticket
  };
};

const setTicketFail = (errorMsg) => {
  return {
    type: actionTypes.SET_TICKET_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const getTicket = (token, id) => {
  return async dispatch => {
    try {
      const header = {
        headers: { 'x-auth-token': token }
      }
      const res = await axios.get('/tickets/' + id, header);
      dispatch(setTicket(res.data));
    } catch (error) {
      dispatch(setTicketFail(error.message));
    };
  };
};


const postTicket = () => {
  return {
    type: actionTypes.POST_TICKET
  };
};

const postSuccess = () => {
  return {
    type: actionTypes.POST_TICKET_SUCCESS,
    error: false
  };
};

const postFail = (errorMsg) => {
  return {
    type: actionTypes.POST_TICKET_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const createTicket = (token, session, form) => {
  return async dispatch => {
    try {
      dispatch(postTicket());
      const postData = {
        professor_id : form.professor_id,
        status : form.status,
        type : form.type,
        created_by : session.name,
        created_by_id: session.userId
      }
      const header = {
        headers: { 'x-auth-token': token }
      }
      const res = await axios.post('/tickets', postData, header);
      dispatch(postSuccess());
      dispatch(grantTicket(token, res.data._id, res.data.professor_id));
      dispatch(getTickets(token));
      } catch (error) {
      dispatch(postFail(error.message));
    };
  };
};


const removeTicket = () => {
  return {
    type: actionTypes.DELETE_TICKET
  };
};

const removeSuccess = () => {
  return {
    type: actionTypes.DELETE_TICKET_SUCCESS,
    error: false
  };
};

const removeFail = (errorMsg) => {
  return {
    type: actionTypes.DELETE_TICKET_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const deleteTicket = (token, id, userId) => {
  return async dispatch => {
    try {
      dispatch(removeTicket());
      const header = {
        headers: { 'x-auth-token': token }
      }
      await axios.delete('/tickets/' + id, header);
      dispatch(removeSuccess());
      dispatch(getTickets(token));
      } catch (error) {
      dispatch(removeFail(error.message));
    };
  };
};

const updateTicket = () => {
  return {
    type: actionTypes.UPDATE_TICKET
  };
};

const updateSuccess = () => {
  return {
    type: actionTypes.UPDATE_TICKET_SUCCESS,
    error: false
  };
};

const updateFail = (errorMsg) => {
  return {
    type: actionTypes.UPDATE_TICKET_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const editTicket = (token, id, session, form) => {
  return async dispatch => {
    try {
      dispatch(updateTicket());
      const putData = {
        professor_id : form.professor_id,
        status : form.status,
        type : form.type,
        created_by : session.name,
        created_by_id: session.userId
      }
      const header = {
        headers: { 'x-auth-token': token }
      }
      await axios.put('/tickets/' + id, putData, header);
      dispatch(updateSuccess());
      dispatch(getTickets(token));
      } catch (error) {
      dispatch(updateFail(error.message));
    };
  };
};
