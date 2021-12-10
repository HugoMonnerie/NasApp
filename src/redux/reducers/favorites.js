import {ADD_FAV, DEL_FAV} from "../actions";
import {isNullOrUndefined} from "../../assets/js/commonFunction";

const initialState = {
    favList : []
}

const addOneFav = (state, action) => {
    if (isNullOrUndefined(action.payload)){
        return {...state}
    }
    return { ...state, favList:[...state.favList, action.payload] }
}

const removeOneFav = (state, action) => {
    let nextState
    const favIndex = state.favList.findIndex(item => item.id === action.payload)
    if (favIndex !== -1) {
        nextState = {
            ...state,
            favList: state.favList.filter( (item, index) => index !== favIndex)
        }
    }
    return !nextState ? state : nextState
}

const favReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_FAV:
            return addOneFav(state, action)
        case DEL_FAV:
            return removeOneFav(state, action)
        default:
            return state
    }
}

export default favReducer