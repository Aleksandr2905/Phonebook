import { phonebookReducer } from './phonebookReducer';
import { configureStore } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';

// import storage from 'redux-persist/lib/storage';

// const phonebookPersistConfig = {
//   key: 'phonebook',
//   storage,
//   whiteList: ['contacts'],
// };

const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store);

export default store;
