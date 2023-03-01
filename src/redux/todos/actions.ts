import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {
  ADD_TODO,
  DELETE_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from '../../graphql/todos';
import {Libs} from '../../lib';
import {Todo} from '../../types';

export const setTodos = createAction<Todo[]>('TODOS/SET');

export const fetchTodos = createAsyncThunk<void, void, {extra: Libs}>(
  'TODOS/FETCH',
  async function handleFetchTodo(params, TunkAPI) {
    const {extra, dispatch} = TunkAPI;
    const {apollo} = extra;

    try {
      const resp = await apollo.query({
        query: GET_TODOS,
      });
      dispatch(setTodos(resp.data.todos));
    } catch (e) {
      console.error('e = ', e);
    }
  },
);

export const addTodo = createAsyncThunk<void, Partial<Todo>, {extra: Libs}>(
  'TODOS/ADD',
  async function handleAddTodo(params, TunkAPI) {
    const {extra, dispatch} = TunkAPI;
    const {apollo} = extra;

    try {
      await apollo.mutate({
        mutation: ADD_TODO,
        variables: params,
      });

      dispatch(fetchTodos());
    } catch (e) {
      console.error('e = ', e);
    }
  },
);

export const updateTodo = createAsyncThunk<void, Todo, {extra: Libs}>(
  'TODOS/UPDATE',
  async function handleUpdateTodo(params, TunkAPI) {
    const {extra, dispatch} = TunkAPI;
    const {apollo} = extra;

    try {
      await apollo.mutate({
        mutation: UPDATE_TODO,
        variables: params,
      });

      dispatch(fetchTodos());
    } catch (e) {
      console.error('e = ', e);
    }
  },
);

export const deleteTodo = createAsyncThunk<void, Partial<Todo>, {extra: Libs}>(
  'TODOS/DELETE',
  async function handleDeleteTodo(params, TunkAPI) {
    const {extra, dispatch} = TunkAPI;
    const {apollo} = extra;

    try {
      await apollo.mutate({
        mutation: DELETE_TODO,
        variables: {id: params.id},
      });

      dispatch(fetchTodos());
    } catch (e) {
      console.error('e = ', e);
    }
  },
);
