import React from "react";
import PaginationLogic from "../FormControls/Pagination";
import User from "./User";



const Users = ({currentPage, totalUsersCount, pageSize, onPageChanged,users, ...props }) => {
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

