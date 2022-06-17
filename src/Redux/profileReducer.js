import { usersAPI } from "../API/API";
import { profileAPI } from "../API/API";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'


let initialState = {
    posts: [
        {id: 0, post: 'Hi, what`s up', likesCount: 12},
        {id: 1, post: 'Hey, i am good enough', likesCount: 412}
    ],
        newPostText: 'Ravil',
        profile: null ,
        status: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost = {
                id: 2,
                post: action.newPostText,
                likesCount: 0
            }
            return  {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        };
        case 'DELETE_POST': {
            return  {...state, posts: state.posts.filter(posts => posts.id != action.postId)}
        }
        case 'SET_STATUS': {
            return {...state, status: action.status}};
        case 'SET_USER_PROFILE': {
            return  {...state, profile: action.profile}
        };
        default:
            return state
    }

}
export const addPostActionCreator =(newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({type: SET_STATUS, status })
export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const getUserProfile = (userId) => async (dispatch) => {
   let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))    
    }

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
        }
}



export default profileReducer;
