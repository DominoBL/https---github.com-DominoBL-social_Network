import React from "react";
import Pagination from "../FormControls/Pagination";
import User from "./User";



const Users = ({currentPage, totalUsersCount, pageSize, onPageChanged,users, ...props }) => {
    return <div>
        <Pagination currentPage={currentPage} onPageChanged={onPageChanged} 
        totalUsersCount={totalUsersCount} pageSize={pageSize} />
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

