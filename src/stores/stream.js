import { createReducer } from '../utils';

export const createStream = (video, seek = 0) => {
  return (dispatch) => {
    dispatch({ type: 'CREATE_STREAM_PENDING' });
    return fetch('/api/stream/create', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ video, seek })
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(({ id, duration }) => {
        return dispatch({ type: 'CREATE_STREAM_FULFILLED', payload: { id, duration, video } });
      })
      .catch((err) => {
        return dispatch({ type: 'CREATE_STREAM_REJECTED' });
      });
  };
};

export const updateStreamTime = (currentTime) => ({ type: 'STREAM_TIME_UPDATES', currentTime });

export const resetStream = () => ({ type: 'STREAM_RESETS' });

const initState = {
  id: '',
  video: '',
  currentTime: 0,
  duration: 0,
  fetching: false,
  fetched: false,
  hasError: false
};

const handlers = {
  CREATE_STREAM_PENDING: (state, action) => ({ ...state, fetching: true, hasError: false }),
  CREATE_STREAM_FULFILLED: (state, action) => {
    const { id, duration, video } = action.payload;
    return { ...state, id, duration, video, fetched: true, fetching: false };
  },
  CREATE_STREAM_REJECTED: (state, action) => ({ ...state, fetching: false, fetched: false, hasError: true }),
  STREAM_TIME_UPDATES: (state, action) => ({ ...state, currentTime: action.currentTime }),
  STREAM_RESETS: () => initState
};

export const streamReducer = createReducer(initState, handlers);