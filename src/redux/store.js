import {createStore, combineReducers, applyMiddleware} from 'redux';
import {favReducer, userReducer} from './reducers/favorites';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'favList',
    storage: AsyncStorage,
    //whitelist: ['favList']
};
const persistConfigUsers = {
    key: 'users',
    storage: AsyncStorage,
    //whitelist: ['favList']
};

const rootReducer = combineReducers({
    favReducer: persistReducer(persistConfig, favReducer),
    userReducer: persistReducer(persistConfigUsers, userReducer),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

