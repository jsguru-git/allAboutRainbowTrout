import { TERMINATE_LOADING } from '../actions';

const INITIAL_STATE = {
    isLoading: true,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TERMINATE_LOADING:
            return Object.assign({}, state, {
                isLoading: !action.isTerminated
            });
        default:
            return state;
    }
};

export default reducer;