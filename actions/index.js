// action types
export const TERMINATE_LOADING = 'TERMINATE_LOADING';

// action creators
export function terminateLoading(isTerminated) {
    return { type:  TERMINATE_LOADING, isTerminated }
}