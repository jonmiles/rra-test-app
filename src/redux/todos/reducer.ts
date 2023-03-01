import {createReducer} from '@reduxjs/toolkit';

import {Todo} from '../../types';
import {setTodos} from './actions';

export const initialTodoState = {
  todos: [] as Todo[],
};

export const todosReducer = createReducer(initialTodoState, builder => {
  builder
    .addCase(setTodos, (state, action) => {
      return {...state, todos: action.payload};
    })
    .addDefaultCase(state => state);
});
