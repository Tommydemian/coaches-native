import { configureStore, combineReducers } from '@reduxjs/toolkit';

// rootReducer => all reducers combined
const rootReducer = combineReducers({
  counter: counterReducer,
});

// Infer the RootState type from the rootReducer
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
