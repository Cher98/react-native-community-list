import {actions} from './actions';

const initialState = {
  loading: false,
  data: [],
  title: '',
};

// This export default will control your state for your application
export default (state = initialState, action: any) => {
  switch (action.type) {
    // Set loading
    case actions.FETCH_DATA_SAGA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    // Get todos
    // case GET_TODOS:
    //   return {
    //     ...state,
    //     todos: payload,
    //     loading: false,
    //   };
    // // Set todo title from user that gonna input a title in form
    // case SET_TODO_TITLE:
    //   return {
    //     ...state,
    //     title: payload,
    //   };
    // // Create new todo
    // case CREATE_TODO:
    //   return {
    //     ...state,
    //     todos: [payload, ...state.todos],
    //     loading: false,
    //   };
    // // Clear todo title in form after creating a new one
    // case CLEAR_TODO_TITLE:
    //   return {
    //     ...state,
    //     title: '',
    //   };
    // // Delete existed todo
    // case DELETE_TODO:
    //   return {
    //     ...state,
    //     todos: state.todos.filter(todo => todo.id !== payload),
    //     loading: false,
    //   };
    // Return default state if you didn't match any case
    default:
      return state;
  }
};
