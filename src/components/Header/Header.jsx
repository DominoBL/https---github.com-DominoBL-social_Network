import s from './Header.module.css' ;
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return( <header className={s.header}>
    <div className={s.hd}>
      <a>WEBBL</a>
    </div>
    <img className={s.header_img} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ8xIAoX0uqvC7iJI-6gfyhHjej7S1mHVc7w&usqp=CAU' />
      <div className={s.loginBlock}>
        {props.isAuth 
        ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
        : <NavLink to = {'/login'}>Login</NavLink>  }
      </div>
  </header>)
}

export default Header;