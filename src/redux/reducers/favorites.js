import {ADD_FAV, DEL_FAV, ADD_USER, DEL_USER} from '../actions';
import {isNullOrUndefined} from '../../assets/js/commonFunction';

const initialState = {
    users: [],
    favList: [],
};

const addOneUser = (state, action) => {
    if (isNullOrUndefined(action.payload)) {
        return {...state};
    }
    const userIndex = state.users.findIndex(item => item.mail === action.payload);
    if (userIndex === -1) {
        const newStateUser = [...state.users]
        newStateUser.unshift({mail:action.payload});
        return {...state, users:  newStateUser};
    }
    return {...state};
};

const removeOneUser = (state, action) => {
    if (isNullOrUndefined(action.payload)) {
        return {...state};
    }
    const userIndex = state.users.findIndex(item => item.mail === action.payload);
    if (userIndex !== -1) {
        return {
            ...state,
            users: state.users.filter((item, index) => index !== userIndex),
        };
    }
    return {...state};
};

const addOneFav = (state, action) => {
    if (isNullOrUndefined(action.payload)) {
        return {...state};
    }
    return {...state, favList: [...state.favList, action.payload]};
};

const removeOneFav = (state, action) => {
    let nextState;
    const favIndex = state.favList.findIndex(item => item.id === action.payload);
    if (favIndex !== -1) {
        nextState = {
            ...state,
            favList: state.favList.filter((item, index) => index !== favIndex),
        };
    }
    return !nextState ? state : nextState;
};

export const favReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAV:
            return addOneFav(state, action);
        case DEL_FAV:
            return removeOneFav(state, action);
        default:
            return state;
    }
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return addOneUser(state, action);
        case DEL_USER:
            return removeOneUser(state, action);
        default:
            return state;
    }
};

