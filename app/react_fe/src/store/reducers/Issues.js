import * as actionTypes from '../../utils/actionTypes';
import update from '../../utils/update';

const initialState = {
    issues: [],
    issue: null,
    error: false,
    errorMsg: ''
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_ISSUES:
            return update(state, {
              error : action.error,
              issues : action.issues});

        case actionTypes.SET_ISSUES_FAIL:
            return update(state, {
              error : action.error,
              errorMsg : action.errorMsg});

        case actionTypes.SET_ISSUE:
            return update(state, {
              error : action.error,
              issue : action.issue});

        case actionTypes.SET_ISSUE_FAIL:
            return update(state, {
              error : action.error,
              errorMsg : action.errorMsg});

        case actionTypes.POST_ISSUE:
            return state;

        case actionTypes.POST_ISSUE_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.POST_ISSUE_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        case actionTypes.DELETE_ISSUE:
            return state;

        case actionTypes.DELETE_ISSUE_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.DELETE_ISSUE_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        case actionTypes.UPDATE_ISSUE:
            return state;

        case actionTypes.UPDATE_ISSUE_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.UPDATE_ISSUE_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        case actionTypes.SUBSCRIPTION_ISSUE_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.SUBSCRIPTION_ISSUE_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        case actionTypes.UNSUBSCRIPTION_ISSUE_SUCCESS:
            return update(state, {error : action.error} );

        case actionTypes.UNSUBSCRIPTION_ISSUE_FAIL:
            return update(state, {
              error : action.error,
              errorMsg: action.errorMsg});

        default:
            return state;
    }
};

export default reducer;
