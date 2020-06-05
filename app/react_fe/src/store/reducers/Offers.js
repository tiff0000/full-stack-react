import * as actionTypes from '../../utils/actionTypes';
import update from '../../utils/update';

const initialState = {
    offers: [],
    offer: null,
    error: false,
    errorMsg: ''
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_OFFERS:
            return update(state, {
              error : action.error,
              offers : action.offers});

        case actionTypes.SET_OFFERS_FAIL:
            return update(state, {
              error : action.error,
              errorMsg : action.errorMsg});

        case actionTypes.SET_OFFER:
            return update(state, {
              error : action.error,
              offer : action.offer});

        case actionTypes.SET_OFFER_FAIL:
            return update(state, {
              error : action.error,
              errorMsg : action.errorMsg});

        case actionTypes.POST_OFFER:
            return state;

        case actionTypes.POST_OFFER_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.POST_OFFER_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        case actionTypes.DELETE_OFFER:
            return state;

        case actionTypes.DELETE_OFFER_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.DELETE_OFFER_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        case actionTypes.UPDATE_OFFER:
            return state;

        case actionTypes.UPDATE_OFFER_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.UPDATE_OFFER_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});
        default:
            return state;
    }
};

export default reducer;
