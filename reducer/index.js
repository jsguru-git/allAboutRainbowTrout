import { TERMINATE_LOADING } from '../actions';

//  initial -> isLoading: true,

export const loadingReducer = (state = true, action) => {
    switch (action.type) {
        case TERMINATE_LOADING:
            return !action.isTerminated;
        default:
            return state;
    }
};
