import * as actionTypes from '../../utils/actionTypes';
import update from '../../utils/update';

const initialState = {
    tickets: [],
    ticket: null,
    error: false,
    errorMsg: ''
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_TICKETS:
            return update(state, {
              error : action.error,
              tickets : action.tickets});

        case actionTypes.SET_TICKETS_FAIL:
            return update(state, {
              error : action.error,
              errorMsg : action.errorMsg});

        case actionTypes.SET_TICKET:
            return update(state, {
              error : action.error,
              ticket : action.ticket});

        case actionTypes.SET_TICKET_FAIL:
            return update(state, {
              error : action.error,
              errorMsg : action.errorMsg});

        case actionTypes.POST_TICKET:
            return state;

        case actionTypes.POST_TICKET_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.POST_TICKET_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        case actionTypes.DELETE_TICKET:
            return state;

        case actionTypes.DELETE_TICKET_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.DELETE_TICKET_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        case actionTypes.UPDATE_TICKET:
            return state;

        case actionTypes.UPDATE_TICKET_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.UPDATE_TICKET_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});
        default:
            return state;
    }
};

export default reducer;
