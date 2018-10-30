// action types
export const TERMINATE_LOADING = 'TERMINATE_LOADING';
export const UPDATE_STATUS = 'UPDATE_STATUS';

export const GAME_STATUS = {
    GAME_WAIT: 'GAME_WAIT',
    GAME_START: 'GAME_START',
    GAME_OVER: 'GAME_OVER', 
}

// action creators
export function terminateLoading(isTerminated) {
    return { type: TERMINATE_LOADING, isTerminated }
}

export function updateGameStatus(gameStatus) {
    return { type: UPDATE_STATUS, gameStatus}
}