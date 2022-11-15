import React, { FC } from "react";
import { UsersType } from "../../Types";
import PaginationLogic from "../FormControls/Pagination.tsx";
import User from "./User";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber:number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    unfollow: (userId:number) => void
    follow: (userId:number) => void
}

const Users: FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged,users, ...props }) => {
    return <div>
        <PaginationLogic currentPage={currentPage} onPageChanged={onPageChanged} 
        totalItemsCount={totalUsersCount} pageSize={pageSize} />
            {
                users.map(u => <User user={u} 
                key={u.id}
                followingInProgress={props.followingInProgress}
                unfollow={props.unfollow}
                follow={props.follow} /> 
                )}
        </div>
    }


export default Users;

