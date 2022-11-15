import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profileReducer.ts";
import dialogsReducer from "./dialogsReducer.ts";
import sideBarReducer from "./sideBarReducer.ts";
import usersReducer from "./usersReducer.ts";
import authReducer from "./authReducer.ts";
import { reducer as formReducer} from 'redux-form'
import appReducer from "./appReducer.ts";


let RootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer ,
    form: formReducer,
    app: appReducer

});

type RootReducersType = typeof RootReducers; // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducersType> // 

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducers, composeEnhancers(applyMiddleware(thunkMiddleware) //middleware
  ));
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
//@ts-ignore
window.store = store
export default store;