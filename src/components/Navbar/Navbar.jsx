import s from './Navbar.module.css';
import React from "react";
import {NavLink} from "react-router-dom";


const Navbar = () => {
  return (
    <navbar className={s.navbar}>
      <div className={s.nbm}>
        <NavLink to='/profile' className={navData=>navData.isActive ? s.active : s.nbm}>Profile</NavLink>
      </div>
      <div className={`${s.nbm} ${s.active}`}>
        <NavLink to='/dialogs' className={navData=>navData.isActive ? s.active : s.nbm}>Messages</NavLink>
      </div>
      <div className={s.nbm}>
        <NavLink to='/news' className={navData=>navData.isActive ? s.active : s.nbm}>News</NavLink>
      </div>
      <div className={s.nbm}>
        <NavLink to='/music' className={navData=>navData.isActive ? s.active : s.nbm}>Music</NavLink>
      </div>
        <div className={s.nbm}>
            <NavLink to='/users' className={navData=>navData.isActive ? s.active : s.nbm}>Users</NavLink>
        </div>
      <div className={s.nbm}>
      <NavLink to='/settings' className={navData=>navData.isActive ? s.active : s.nbm}>Settings</NavLink>
      </div>
    </navbar>)
}

export default Navbar;