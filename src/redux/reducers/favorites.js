const initialState = {
    favList : []
}

const addOneFav = (state, action) => {
    return { ...state, favList:[...state.favList, action.value] }
}

const removeOneFav = (state, action) => {
    let nextState
    const favIndex = state.favList.findIndex(item => item.id === action.value)
    if (favIndex !== -1) {
        nextState = {
            ...state,
            favList: state.favList.filter( (item, index) => index !== favIndex)
        }
    }
    return !nextState ? state : nextState
}

const handleFav = (state=initialState, action) => {
    switch (action.type) {
        case "ADD_FAV":
            return addOneFav(state, action)
        case "DEL_FAV":
            return removeOneFav(state, action)
        default:
            return state
    }
}

export default handleFav