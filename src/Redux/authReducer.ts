
import { stopSubmit } from 'redux-form';
import {authAPI, securityAPI, ResultCodeEnum, LogoutResultCodeEnum } from '../API/API.ts';

const SET_USER_DATA = 'SET_USER_DATA' ;
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType = {
    id: number | null ,
    login: string | null,
    email: string | null,
    isAuth: boolean
    captchaUrl: string | null,
}
let initialState:InitialStateType = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action:any):InitialStateType => {
    //debugger;
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
                return {
                    ...state,
                    ...action.payload,    
                }
        default:
                return state;
    }
}
export type SetAuthUserDataPayloadActionType = {
    userId: number | null , email: string | null, login: string | null, isAuth: boolean
}
export type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA, payload: SetAuthUserDataPayloadActionType
}

export type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean):SetAuthUserDataActionType => ({ type: SET_USER_DATA, payload: {userId, email, login, isAuth} });
export const getCaptchaUrlSuccess = (captchaUrl:string):GetCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} });

export const getAuthData = () => async (dispatch:any) => {
    let meData = await authAPI.me();
               if (meData.resultCode === ResultCodeEnum.Success) {
                   let {id, email, login,} = meData.data ;
                   dispatch(setAuthUserData(id, email, login, true));
               }
};

export const login = (email:string, password:string, rememberMe:boolean,captcha:string) => async (dispatch:any) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
               if (loginData.resultCode === ResultCodeEnum.Success) {
                   dispatch(getAuthData());
               } else { 
                if (loginData.resultCode === ResultCodeEnum.CaptchaIsRequired ) {
                    dispatch(getCaptchaUrl())
                }

                 let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
                 dispatch(stopSubmit('login', {_error: message}));   
               }
}

export const getCaptchaUrl = () => async (dispatch:any) => {
    let response = await securityAPI.getCaptchaUrl();
    let captchaUrl = response.data.url;
                 dispatch(getCaptchaUrlSuccess(captchaUrl));   
               }


export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout()
               if (response.data.resultCode === LogoutResultCodeEnum.Success) {
                   dispatch(setAuthUserData(null, null, null, false));
               }
}

export default authReducer ;