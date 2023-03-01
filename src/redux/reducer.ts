import {initialTodoState, todosReducer} from './todos/reducer';

export const initialState = {
  todos: initialTodoState,
};

export const rootReducer = {
  todos: todosReducer,
};
