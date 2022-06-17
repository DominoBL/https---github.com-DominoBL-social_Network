import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { Input } from '../FormControls/FormsControls'
import {login} from '../../Redux/authReducer'
import { Redirect } from 'react-router'
import styles from '../FormControls/FormsControls.module.css' 

const LoginForm = ({handleSubmit, error }) => {

    return <div> 
    <form onSubmit={handleSubmit}>

        <div>
            <Field placeholder={"Email"} name={"email"} component={Input} validate={[required]} />
        </div>
        <div>
            <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} type={"password"}/>
        </div>
        <div>
            <Field type={"checkbox"} name={"remember me"} component={Input} /> remember me 
        </div>
        <div>
          {error &&   
        <div className = {styles.formSummaryError}>
            {error}
        </div>
        }
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
    </div>
}

const LoginReduxForm = reduxForm({
    form: 'login'
}) (LoginForm)

const LoginPage = ({isAuth, login}) => {
    const onSubmit =(formData) => {
        login(formData.email, formData.password, formData.rememberMe)
    }
    if(isAuth) {
        return <Redirect to={"/profile"} />
    }
    return  <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={ onSubmit }/>
    </div>
}
 
let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {login}) (LoginPage);