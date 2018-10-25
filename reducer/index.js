import { TERMINATE_LOADING, GAME_STATUS, UPDATE_STATUS } from '../actions';

//  initial -> isLoading: true,

export const loadingReducer = (state = true, action) => {
    switch (action.type) {
        case TERMINATE_LOADING:
            return !action.isTerminated;
        default:
            return state;
    }
};

const initGameState = {
    // status: GAME_STATUS.GAME_OVER,
    status: GAME_STATUS.GAME_START,
    duration: 15,
    Score: 0,
}

export const gameStateReducer = (state = initGameState, action) => {
    switch (action.type) {
        case UPDATE_STATUS:
            return Object.assign({}, state, {
                status: action.gameStatus
            });
        default:
            return state
    }
};
