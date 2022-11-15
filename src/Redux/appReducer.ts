import {getAuthData} from './authReducer.ts'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS' ;

export type InitialStateType = {
    initialized: boolean
}

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
    // debugger;
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,    
            }
        default:
                return state; 
    }
}

export type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}; 
export const initializedSuccess = (): initializedSuccessActionType  => ({ type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthData());
    Promise.all([promise]).then (() => {
        dispatch(initializedSuccess())
    } );
}

export default appReducer ;