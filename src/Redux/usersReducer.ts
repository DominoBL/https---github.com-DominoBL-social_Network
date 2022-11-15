import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {usersAPI} from '../API/API.ts';
import { PhotosType, UsersType } from '../Types';
import { updateObjectArray } from '../utils/validators/objectHelp';
import { AppStateType } from './redux-store';

const FOLLOW = 'FOLLOW' ;
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_IN_FOLLOWING_PROGRESS = 'TOGGLE_IS_IN_FOLLOWING_PROGRESS';


// ||

let initialState = {
    users: [] as Array<UsersType> ,
    pageSize: 5 ,
    totalUsersCount: 0 ,
    currentPage: 1 ,
    isFetching: true ,
    followingInProgress: [] as Array<number> // array of users id
}
export type initialStateType = typeof initialState

type ActionType = FollowSuccessType| UnfollowSuccessType| SetUsersType| SetCurrentPageType|
 SetTotalUsersCountType| ToggleIsFetchingType| ToggleIsInFollowingProgressType

const usersReducer = (state = initialState, action:ActionType):initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectArray (state.users, action.userId, "id" , {followed: true} )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectArray (state.users, action.userId, "id" , {followed: false} )
            }
        case SET_USERS: {
            return { ...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return { ...state,currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_IN_FOLLOWING_PROGRESS: {
            return { 
                ...state, 
                followingInProgress:  action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId) 
            }
        }
        default:
                return state;
    }
}
type FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}
type UnfollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleIsInFollowingProgressType = {
    type: typeof TOGGLE_IS_IN_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const followSuccess =(userId:number):FollowSuccessType => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId:number):UnfollowSuccessType => ({type: UNFOLLOW, userId });
export const setUsers = (users:Array<UsersType>):SetUsersType => ({type: SET_USERS , users });
export const setCurrentPage = (currentPage:number):SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsInFollowingProgress = (isFetching:boolean, userId:number):ToggleIsInFollowingProgressType => ({type: TOGGLE_IS_IN_FOLLOWING_PROGRESS, isFetching, userId});


type DispatchType = Dispatch<ActionType>
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const requestUsers = (currentPage:number, pageSize:number): ThunkActionType => {
    return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage))
   let data = await usersAPI.requestUsers(currentPage, pageSize);
            dispatch(toggleIsFetching(false)); 
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        }
}
const followUnfollowFlow = async (dispatch:DispatchType, userId:number, apiMethod:any, actionCreator:(userId:number) => FollowSuccessType| UnfollowSuccessType ) => {
    dispatch(toggleIsInFollowingProgress(true,userId));
        let response = await apiMethod(userId);
            if (response.data.resultCode == 0 ) {
                dispatch(actionCreator(userId))
             }
            dispatch(toggleIsInFollowingProgress(false, userId));
        };
export const follow = (userId:number): ThunkActionType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess) 
    }}
export const unfollow = (userId:number): ThunkActionType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess) ; 
}}


export default usersReducer;
