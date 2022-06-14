import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../FormControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';
// import { Redirect } from 'react-router';

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog + '' + s.active}>
            <NavLink to={path}> {props.name} </NavLink>
        </div>
    )
}
const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(dialogs => <DialogItem name={dialogs.name} key={dialogs.id} id={dialogs.id}/>);
    let messagesElements = state.messages.map(messages => <Message message={messages.message} key={messages.id}/>);
    let newMessageBody = state.newMessageBody;

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    // if (!props.isAuth) return <Redirect to={"/login"} />;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessagesFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

let maxLength50 = maxLengthCreator(50)

const AddMessagesForm = (props) => {

    return <form onSubmit={props.handleSubmit}>
    <div className={s.textarea}>
        <Field component={Textarea}
        validate = {[required, maxLength50]} 
        name={'newMessageBody'} 
        placeholder={'Enter your message'}/>
    </div>
    <div className={s.btnSend}>
        <button className={s.sendButton}>Send</button>
    </div>
</form>
}

const AddMessagesFormRedux = reduxForm({form: "dialogAddMessageForm"}) (AddMessagesForm)

export default Dialogs;