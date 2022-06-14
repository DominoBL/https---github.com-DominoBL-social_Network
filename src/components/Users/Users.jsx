import styles from "./users.module.css";
import userPhoto from "../../assets/users.png";
import React from "react";
import {NavLink} from "react-router-dom";



const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }
        return <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p && styles.selectedPage}
                                 onClick={(e) => {
                                     props.onPageChanged(p);
                                 }}>{p}</span>
                })}

            </div>
            {
                props.users.map(u => <div key={u.id}>
                <span>
                <div>
                    <NavLink to={'/profile' }>
                      <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.photo} alt=''/>
                    </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id=>id === u.id)} className={styles.buttonUnfollow} onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id=>id === u.id)} className={styles.buttonFollow} onClick={() => {
                                props.follow(u.id);
                                }}>Follow</button>}
                    </div>
                </span>
                    <span>
                    <div className={styles.name}>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                    <span>
                    {/* <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div> */}
                </span>

                </div>)}
        </div>

}
export default Users;

