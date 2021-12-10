export const ADD_FAV = 'ADD_FAV';
export const DEL_FAV = 'DEL_FAV';

export const addFavorite = data => dispatch => {
    dispatch({
        type: ADD_FAV,
        payload: data
    });
};

export const removeFavorite = index => dispatch => {
    dispatch({
        type: DEL_FAV,
        payload: index
    });
};
