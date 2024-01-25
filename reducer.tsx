import {actions} from './actions';

const initialState = {
  loading: false,
  data: [],
  data2: [],
  title: '',
};

// This export default will control your state for your application
export default (state = initialState, action: any) => {
  switch (action.type) {
    case actions.FETCH_DATA_SAGA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case actions.FETCH_DATA_SUCCESS:
      return {
        ...state,
        data2: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
