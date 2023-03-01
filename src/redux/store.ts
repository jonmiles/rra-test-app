import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {initialState, rootReducer} from './reducer';
import {libs} from '../lib';

export const store = configureStore({
  reducer: combineReducers(rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: {extraArgument: libs}}),
  preloadedState: initialState,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
