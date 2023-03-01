import {createSelector} from '@reduxjs/toolkit';

import {AppState} from '../store';

export const getTodosSlice = (state: AppState) => state.todos;

export const getTodos = createSelector([getTodosSlice], state => state.todos);
