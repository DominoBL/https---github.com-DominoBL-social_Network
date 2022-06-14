
import './App.css';
import React, { Component } from "react";
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp} from './Redux/appReducer';
import { compose } from 'redux';
import {withRouter} from "react-router-dom";
import Preloader from './components/Preloader/Preloader';


class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        // debugger
        if (!this.props.initialized) {
        return <Preloader/>
        }
    return (
        
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>

                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                    
                </div>
            </div>
            
            );
}
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose (
    withRouter,
    connect (mapStateToProps, {initializeApp})) (App);
