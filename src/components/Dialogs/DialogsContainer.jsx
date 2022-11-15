import {sendMessageCreator} from "../../Redux/dialogsReducer.ts";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import { withAuthRedirect } from "../HOC/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage , 
        // isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody)=>{
            dispatch(sendMessageCreator(newMessageBody))
        } ,

    }
}

compose (
    connect (mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
let AuthRedirectComponent = withAuthRedirect(Dialogs);


const DialogsContainer = connect (mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);

export default compose (
    connect (mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);