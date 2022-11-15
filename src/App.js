
import './App.css';
import React, { Component, Suspense } from "react";
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import { Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer.tsx";
import ProfileContainer from "./components/Profile/ProfileContainer.tsx";
import LoginPage from './components/Login/Login.tsx';
import { connect } from 'react-redux';
import { initializeApp} from './Redux/appReducer.ts';
import { compose } from 'redux';
import {withRouter} from "react-router-dom";
import Preloader from './components/Preloader/Preloader';



const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));


class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if (!this.props.initialized) {
        return <Preloader/>
        }

    return (
        <Suspense fallback={<Preloader/>}>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>

                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/users' render={() => <UsersContainer pageTitle={"Пользователи"}/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                        {/* <Route path='*' render={() => <div>404 NOT FOUND</div>}/> */}
                    
                </div>
            </div>
            </Suspense>
            );
}
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose (
    withRouter,
    connect (mapStateToProps, {initializeApp})) (App);
