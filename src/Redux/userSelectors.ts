import { AppStateType } from './redux-store.ts';
import { createSelector } from "reselect";


const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector (getUsersSelector, 
    (users) => {
    // debugger;
    return users.filter(u => true);
})


export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
