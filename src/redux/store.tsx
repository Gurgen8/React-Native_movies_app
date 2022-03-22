import { configureStore } from '@reduxjs/toolkit';
import listsReducer from './ListSlice';

const createDebugger = require('redux-flipper').default;

const configureCustomStore = () => {
  const store = configureStore({
    reducer: listsReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(createDebugger()),
  });
  return { store };
};

export const { store } = configureCustomStore();