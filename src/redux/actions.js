export const ADD_FAV = 'ADD_FAV';
export const DEL_FAV = 'DEL_FAV';
export const ADD_USER = 'ADD_USER';
export const DEL_USER = 'DEL_USER';

export const addUser = data => dispatch => {
    dispatch({
        type: ADD_USER,
        payload: data,
    });
};

export const removeUser = data => dispatch => {
    dispatch({
        type: DEL_USER,
        payload: data,
    });
};


export const addFavorite = data => dispatch => {
    dispatch({
        type: ADD_FAV,
        payload: data,
    });
};

export const removeFavorite = index => dispatch => {
    dispatch({
        type: DEL_FAV,
        payload: index,
    });
};
