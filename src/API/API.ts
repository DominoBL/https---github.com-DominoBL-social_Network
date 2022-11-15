import axios  from "axios";


const instance = axios.create({
    withCredentials: true,
    headers: {
            "API-KEY" : "b788c743-6630-4688-be5a-c490943ec5f7" },
    baseURL:  'https://social-network.samuraijs.com/api/1.0/'       
});

export const usersAPI = {
    requestUsers(currentPage = 1, pageSize = 5) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
    .then(response => {
        return response.data
    });
  },
 follow(userId:number) {
    return instance.post(`follow/${userId}`)
 },
 unfollow(userId:number) {
    return instance.delete(`follow/${userId}`)
},
getProfile(userId:number) {
    console.warn('OBsolete method. Use profileAPI in the way to avoid warnings')
    return profileAPI.getProfile(userId)
}
};   

export const profileAPI = {
    getProfile(userId:number) {
        return instance.get(`profile/` + userId )
    },
    getStatus(userId:number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status:string) {
        return instance.put(`profile/status`, {status : status})
    },
    savePhoto(photoFile:any) {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put ('profile/photo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            } 
    })
}
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export enum LogoutResultCodeEnum {
    Success = 0,
    Error = 1,
}

type MeResponseType = {
    data: {
        id:number
        email:string
        login:string
    }
    resultCode: ResultCodeEnum
    messagess: Array<string>
}
type LoginResponseType = {
    data: {
        userId:number
    }
    resultCode: ResultCodeEnum
    messagess: Array<string>
}

type LogoutResponseType = {
    data: {
        userId:number
    }
    resultCode: LogoutResultCodeEnum
    messagess: Array<string>
}
type CaptchaResponseType = {
    captchaurl: string
}

export const authAPI = {
me () {
    return instance.get<MeResponseType>(`auth/me`).then (res => res.data)
}, 

login (email:string, password:string, rememberMe:boolean = false, captcha:string|null = null) {
    return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha})
    .then (response => response.data)
},
logout () {
    return instance.delete<LogoutResponseType>(`auth/login`)
}
}

export const securityAPI = {
    getCaptchaUrl () {
        return instance.get<CaptchaResponseType>(`security/get-captcha-url`)
    },
    }
;