export type PostsType = {
    id: Number
    post: string
    likesCount: number
}
export type ProfileType = {
    userId: Number
    photos: PhotosType
}
export type PhotosType = {
    small: string | null
    large: string | null
}

export type UsersType = {
    id: number 
    name : string 
    status: string
    photos: PhotosType
}