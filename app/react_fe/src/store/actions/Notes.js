import * as actionTypes from '../../utils/actionTypes';
import axios from 'axios';
import { getIssue } from './Issues';


const setNote = (note) => {
  return {
    type: actionTypes.SET_NOTE,
    error: false,
    note: note
  };
};

const setNoteFail = (errorMsg) => {
  return {
    type: actionTypes.SET_NOTE_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const getNote = (token, id) => {
  return async dispatch => {
    try {
      const header = {
        headers: { 'x-auth-token': token }
      }
      const res = await axios.get('/notes/' + id, header);
      dispatch(setNote(res.data));
    } catch (error) {
      dispatch(setNoteFail(error.message));
    };
  };
};


const postNote = () => {
  return {
    type: actionTypes.POST_NOTE
  };
};

const postSuccess = () => {
  return {
    type: actionTypes.POST_NOTE_SUCCESS,
    error: false
  };
};

const postFail = (errorMsg) => {
  return {
    type: actionTypes.POST_NOTE_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const createNote = (token, issueId, session, form) => {
  return async dispatch => {
    try {
      dispatch(postNote());
      const postData = {
        created_by_id: session.userId,
        created_by: session.name,
        message: form.message.value,
      }
      const header = {
        headers: { 'x-auth-token': token }
      }
      await axios.post('/issues/' + issueId + '/notes', postData, header);
      dispatch(postSuccess());
      dispatch(getIssue(token, issueId));
      } catch (error) {
      dispatch(postFail(error.message));
    };
  };
};


const removeNote = () => {
  return {
    type: actionTypes.DELETE_NOTE
  };
};

const removeSuccess = () => {
  return {
    type: actionTypes.DELETE_NOTE_SUCCESS,
    error: false
  };
};

const removeFail = (errorMsg) => {
  return {
    type: actionTypes.DELETE_NOTE_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const deleteNote = (token, issueId, noteId) => {
  return async dispatch => {
    try {
      dispatch(removeNote());
      const header = {
        headers: { 'x-auth-token': token }
      }
      await axios.delete('/issues/' + issueId + '/notes/' + noteId + '/del', header);
      dispatch(removeSuccess());
      dispatch(getIssue(token, issueId));
      } catch (error) {
      dispatch(removeFail(error.message));
    };
  };
};

const updateNote = () => {
  return {
    type: actionTypes.UPDATE_NOTE
  };
};

const updateSuccess = () => {
  return {
    type: actionTypes.UPDATE_NOTE_SUCCESS,
    error: false
  };
};

const updateFail = (errorMsg) => {
  return {
    type: actionTypes.UPDATE_NOTE_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const editNote = (token, issueId, noteId, session, form) => {
  return async dispatch => {
    try {
      dispatch(updateNote());
      const putData = { message: form.message.value }
      const header = {
        headers: { 'x-auth-token': token }
      }
      await axios.post('/issues/' + issueId + '/notes/' + noteId + '/edit', putData, header);
      dispatch(updateSuccess());
      dispatch(getIssue(token, issueId));
      } catch (error) {
      dispatch(updateFail(error.message));
    };
  };
};
