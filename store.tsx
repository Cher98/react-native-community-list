import {createSlice, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';
import rootReducer from './rootReducer';

const repoSlice = createSlice({
  name: 'repo',
  initialState: {
    repos: [],
  },
  reducers: {
    fetchData: (state, action) => {
      return {
        repos: action.payload,
      };
    },
    // fetchMore: (state, action) => {
    //   return {
    //     repos: action.payload
    //   }
    // }
  },
});

export const {fetchData} = repoSlice.actions;

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  // reducer: {
  //   repo: repoSlice.reducer
  // },
  // reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
