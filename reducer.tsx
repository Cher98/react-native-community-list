import {actions} from './actions';

const initialState = {
  loading: false,
  data: [],
  data2: [],
  endOfList: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.FETCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_DATA_SAGA:
      return {
        ...state,
        data: action.payload,
        loading: false,
        endOfList: false,
      };
    case actions.FETCH_DATA_SUCCESS:
      return {
        ...state,
        data2: action.payload,
        loading: false,
        endOfList: false,
      };
    case actions.FETCH_MORE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        endOfList: action.payload.listEnded,
        loading: false,
      };
    default:
      return state;
  }
};
