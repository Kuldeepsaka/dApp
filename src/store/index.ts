import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import walletReducer from './slices/walletSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage

// Persist config for each slice or root
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'wallet'], // only theme slice persisted globally
};

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  wallet: walletReducer, // ⬅️ Add here
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  // middleware fix for redux-persist + redux-toolkit
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistor for redux-persist
export const persistor = persistStore(store);

// Infer RootState and AppDispatch types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
