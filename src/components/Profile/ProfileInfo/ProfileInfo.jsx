import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhotosDefault from "../../../assets/users.png"




const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {

    if (!profile ) {
        return <Preloader/>
    }

const onMainPhotoSelected = (e) => {
    debugger;
    if(e.target.files.length) {
        savePhoto(e.target.files[0]);
    }
}

    return(
        <div >
            {/* <div>
                <img className='Profile_profile_img__wu7hn 'src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtfZRhbGQtq2BapB2MXJfWIO2QriO5Wx3qQ&usqp=CAU' />
            </div> */}
            <div className={s.descriptionBlock}>
                <img src = {profile.photos.small || userPhotosDefault} className={s.photo} />
                {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )}
export default ProfileInfo ;