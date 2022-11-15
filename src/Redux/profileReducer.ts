import { usersAPI } from "../API/API.ts";
import { profileAPI } from "../API/API.ts";
import { PhotosType, PostsType, ProfileType } from "../Types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


let initialState = {
    posts: [
        {id: 0, post: 'Hi, what`s up', likesCount: 12},
        {id: 1, post: 'Hey, i am good enough', likesCount: 412}
    ] as Array<PostsType>,
        newPostText: '',
        profile: null as ProfileType | null ,
        status: ""
}
 export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action:any ):initialStateType => {
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
        case 'SET_STATUS': 
            return {...state, status: action.status};
        case 'SET_USER_PROFILE': 
            return  {...state, profile: action.profile};
        case 'SAVE_PHOTO_SUCCESS': 
        debugger;
            return  {...state, profile: {...state.profile, photos: action.photos} as ProfileType};
        default:
            return state
    }

}
type addPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
type setUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type setStatusType = {
    type: typeof SET_STATUS
    status: string
}
type deletePostType = {
    type: typeof DELETE_POST
    postId: string
}
type savePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const addPostActionCreator =(newPostText:string):addPostActionCreatorType => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile:ProfileType):setUserProfileType => ({type: SET_USER_PROFILE, profile })
export const setStatus = (status: string):setStatusType => ({type: SET_STATUS, status })
export const deletePost = (postId: string):deletePostType => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos:PhotosType):savePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId:number) => async (dispatch:any) => {
   let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))    
    }

export const getStatus = (userId:number) => async (dispatch:any) => {
  let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
}

export const updateStatus = (status:string) => async (dispatch:any) => {
  let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
        }
}
export const savePhoto = (file:any) => async (dispatch:any) => {
    // debugger;
    let response = await profileAPI.savePhoto(file)
    
          if (response.data.resultCode === 0) {
          dispatch(savePhotoSuccess(response.data.data.photos))
          }
  }


export default profileReducer;
