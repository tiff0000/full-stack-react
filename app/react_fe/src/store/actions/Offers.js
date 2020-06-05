import * as actionTypes from '../../utils/actionTypes';
import axios from 'axios';

const setOffers = (offers) => {
  return {
    type: actionTypes.SET_OFFERS,
    error: false,
    offers: offers
  };
};

const setOffersFail = (errorMsg) => {
  return {
    type: actionTypes.SET_OFFERS_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const getOffers = (token) => {
  return async dispatch => {
    try {
      const header = {
        headers: { 'x-auth-token': token }
      }
      const res = await axios.get('/offers', header);
      dispatch(setOffers(res.data));

    } catch (error) {
      dispatch(setOffersFail(error.message));
    };
  };
};

const setOffer = (offer) => {
  return {
    type: actionTypes.SET_OFFER,
    error: false,
    offer: offer
  };
};

const setOfferFail = (errorMsg) => {
  return {
    type: actionTypes.SET_OFFER_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const getOffer = (token, id) => {
  return async dispatch => {
    try {
      const header = {
        headers: { 'x-auth-token': token }
      }
      const res = await axios.get('/offers/' + id, header);
      dispatch(setOffer(res.data));
    } catch (error) {
      dispatch(setOfferFail(error.message));
    };
  };
};


const postOffer = () => {
  return {
    type: actionTypes.POST_OFFER
  };
};

const postSuccess = () => {
  return {
    type: actionTypes.POST_OFFER_SUCCESS,
    error: false
  };
};

const postFail = (errorMsg) => {
  return {
    type: actionTypes.POST_OFFER_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const createOffer = (token, session, form) => {
  return async dispatch => {
    try {
      dispatch(postOffer());
      //ticket_id: req.body.ticket_id,
      const postData = {
        created_by : session.name,
        created_by_id : session.userId,
        applicant: form.applicant,
        type : form.type,
        status : form.status,
        round : form.round
      }
      const header = {
        headers: { 'x-auth-token': token }
      }
      await axios.post('/offers', postData, header);
      dispatch(postSuccess());
      dispatch(getOffers(token));
      } catch (error) {
      dispatch(postFail(error.message));
    };
  };
};


const removeOffer = () => {
  return {
    type: actionTypes.DELETE_OFFER
  };
};

const removeSuccess = () => {
  return {
    type: actionTypes.DELETE_OFFER_SUCCESS,
    error: false
  };
};

const removeFail = (errorMsg) => {
  return {
    type: actionTypes.DELETE_OFFER_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const deleteOffer = (token, id) => {
  return async dispatch => {
    try {
      dispatch(removeOffer());
      const header = {
        headers: { 'x-auth-token': token }
      }
      await axios.delete('/offers/' + id, header);
      dispatch(removeSuccess());
      dispatch(getOffers(token));
      } catch (error) {
      dispatch(removeFail(error.message));
    };
  };
};

const updateOffer = () => {
  return {
    type: actionTypes.UPDATE_OFFER
  };
};

const updateSuccess = () => {
  return {
    type: actionTypes.UPDATE_OFFER_SUCCESS,
    error: false
  };
};

const updateFail = (errorMsg) => {
  return {
    type: actionTypes.UPDATE_OFFER_FAIL,
    error: true,
    errorMsg: errorMsg
  };
};

export const editOffer = (token, id, session, form) => {
  return async dispatch => {
    try {
      dispatch(updateOffer());
      const putData = {
        created_by : session.name,
        created_by_id : session.userId,
        applicant: form.applicant,
        type : form.type,
        status : form.status,
        round : form.round
      }
      const header = {
        headers: { 'x-auth-token': token }
      }
      await axios.put('/offers/' + id, putData, header);
      dispatch(updateSuccess());
      dispatch(getOffers(token));
      } catch (error) {
      dispatch(updateFail(error.message));
    };
  };
};
