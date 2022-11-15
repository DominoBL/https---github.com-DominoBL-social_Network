import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../Redux/profileReducer.ts";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../HOC/withAuthRedirect"
import { compose } from "redux";
import {getStatus} from "../../Redux/profileReducer.ts"
import {updateStatus} from "../../Redux/profileReducer.ts"
import {savePhoto} from "../../Redux/profileReducer.ts"
import { AppStateType } from "../../Redux/redux-store";

type MapStateType = {
    profile: string,
    status: string,
    authorizedUserId: number,
    isAuth: boolean

}

type DispatchType = {
    updateStatus : ()=>void
    savePhoto: ()=>void
    getUserProfile: (userId:number)=>void
    getStatus: (userId:number)=>void
}

type OwnPropsType = {
}

type PropsType = MapStateType & DispatchType & OwnPropsType
class ProfileContainer extends React.Component<PropsType> {
    
    refresh() {
        let userId = this.props.match.params.userId;
            if (!userId) {
                userId = this.props.authorizedUserId;
                if (!userId) {
                    this.props.history.push('/login')
                }
            }
            this.props.getUserProfile(userId);
                this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refresh() ;
    }
        

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.match.params.userId != prevProps.match.params.userId) {
            this.refresh() 
        }
    }
    
    render() {
        return (
                <Profile {...this.props} 
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile} 
                status={this.props.status} 
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state:AppStateType):MapStateType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose (
    connect<MapStateType,DispatchType,OwnPropsType,AppStateType> (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto }),
    withRouter,
    withAuthRedirect,
)
(ProfileContainer)

