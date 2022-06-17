import { stopSubmit } from 'redux-form';
import {authAPI} from '../API/API';

const SET_USER_DATA = 'SET_USER_DATA' ;



let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    //debugger;
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.payload,    
            }
        default:
                return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {userId, email, login, isAuth} });

export const getAuthData = () => async (dispatch) => {
    let response = await authAPI.me();
               if (response.data.resultCode === 0) {
                   let {id, email, login,} = response.data.data ;
                   dispatch(setAuthUserData(id, email, login, true));
               }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
               if (response.data.resultCode === 0) {
                   dispatch(getAuthData());
               } else { 
                 let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                 dispatch(stopSubmit('login', {_error: message}));   
               }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
               if (response.data.resultCode === 0) {
                   dispatch(setAuthUserData(null, null, null, false));
               }
}

export default authReducer ;