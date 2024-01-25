import {createSlice, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';
import rootReducer from './rootReducer';

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
