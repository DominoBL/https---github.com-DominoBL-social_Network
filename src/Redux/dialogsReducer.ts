const SEND_MESSAGE = 'SEND-MESSAGE';

export type initialStateType = typeof initialState;
type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}
let initialState =    {
    messages: [
        {id: 0, message: 'Hi'},
        {id: 1, message: 'Hi, how are you?'},
        {id: 2, message: 'I`m good enough'},
        {id: 3, message: 'Nice'},
        {id: 4, message: 'You are welcome'},
    ] as Array<MessagesType> ,
    dialogs: [
        {id: 0, name: 'Ravil'},
        {id: 1, name: 'Julia'},
        {id: 2, name: 'Egor'},
        {id: 3, name: 'Nikita'},
        {id: 4, name: 'Artem'},
    ] as Array<DialogsType>,    
}

const dialogsReducer = (state = initialState, action:any):initialStateType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            let body = action.newMessageBody;
            return  {
                ...state,
                messages: [...state.messages, {id: 5, message: body}],
            };
        default:
            return state
    }
}
export type sendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE 
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody:string):sendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody });


export default dialogsReducer;





