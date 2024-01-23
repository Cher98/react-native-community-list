import {
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./sagas";

const repoSlice = createSlice({
  name: "repo",
  initialState: {
    repos: []
  },
  reducers: {
    fetchData: (state, action) => {
      return {
        repos: action.payload
      };
    }
  }
});

export const { fetchData } = repoSlice.actions;

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    repo: repoSlice.reducer
  },
  // reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(saga);

export default store;

export type RootState = ReturnType<typeof store.getState>