import * as actionTypes from '../../utils/actionTypes';
import update from '../../utils/update';

const initialState = {
    notes: [],
    note: null,
    error: false,
    errorMsg: ''
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.SET_NOTE:
            return update(state, {
              error : action.error,
              note : action.note});

        case actionTypes.SET_NOTE_FAIL:
            return update(state, {
              error : action.error,
              errorMsg : action.errorMsg});

        case actionTypes.POST_NOTE:
            return state;

        case actionTypes.POST_NOTE_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.POST_NOTE_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        case actionTypes.DELETE_NOTE:
            return state;

        case actionTypes.DELETE_NOTE_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.DELETE_NOTE_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        case actionTypes.UPDATE_NOTE:
            return state;

        case actionTypes.UPDATE_NOTE_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.UPDATE_NOTE_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});
        default:
            return state;
    }
};

export default reducer;
