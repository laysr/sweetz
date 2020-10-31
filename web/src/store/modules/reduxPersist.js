import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'SWEETZ',
      storage,
      whitelist: ['example'],
    },
    reducers
  );

  return persistedReducers;
};
