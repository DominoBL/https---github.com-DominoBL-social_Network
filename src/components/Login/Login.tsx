import React from 'react'
import { connect } from 'react-redux'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators.ts'
import { Input } from '../FormControls/FormsControls.tsx'
import {login} from '../../Redux/authReducer.ts'
import { Redirect } from 'react-router'
import styles from '../FormControls/FormsControls.module.css' 
import { FieldValidatorType } from '../../utils/validators/validators.ts'

type LoginFormOwnProps = {
    captchaUrl : string | null
}

type FieldType = {
    placeholder: string
    name: string 
    component: string | React.Component| React.FC
    validate: Array<FieldValidatorType>
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps > & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl }) => {

    return <div> 
    <form onSubmit={handleSubmit}>

        <div>
            <Field<FieldType> placeholder={"Email"} name={"email"} component={Input} validate={[required]} />
        </div>
        <div>
            <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} type={"password"}/>
        </div>
        <div>
            <Field type={"checkbox"} name={"remember me"} component={Input} /> remember me 
        </div>
        { captchaUrl && <img src={captchaUrl} />}
        { captchaUrl && <Field type={"captcha"} name={"captcha"} component={Input} /> }
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
}) (LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email:string, password:string, rememberMe:boolean,captcha:string) => void
}
type LoginFormValuesType = {
    email:string
    password:string
    rememberMe:boolean
    captcha:string
}


const LoginPage: React.FC<MapStatePropsType & MapDispatchPropsType> = ({isAuth, login, captchaUrl}) => {
    const onSubmit =(formData:LoginFormValuesType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if(isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return  <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={ onSubmit } captchaUrl={captchaUrl}/>
    </div>
}
 
let mapStateToProps = (state:MapStatePropsType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect (mapStateToProps, {login}) (LoginPage);