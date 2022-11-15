import React from "react";
import {
    follow,
    setCurrentPage,
    unfollow, toggleIsInFollowingProgress, requestUsers
} from "../../Redux/usersReducer.ts";
import {connect} from "react-redux";
import Users from "./Users.tsx";
import Preloader from "../Preloader/Preloader";
import {withAuthRedirect} from "../HOC/withAuthRedirect"
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsAuth, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../Redux/userSelectors.ts";
import { UsersType } from "../../Types";
import { AppStateType } from "../../Redux/redux-store.tsx";

type MapDispatchToPropsType = { 
    follow: (userId:number)=> void
    unfollow: (userId:number)=>void
    requestUsers: (currentPage:number,pageSize:number) => void
}

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    isAuth: boolean
}

type OwnPropsType = {
    pageTitle: string   
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
        <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ?
                <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

// let AuthRedirectComponent = withAuthRedirect(UsersContainer);


let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        users:  getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state)
    }
}



export default compose (
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow, unfollow,
        requestUsers: requestUsers
    }) 
)(UsersContainer);



 