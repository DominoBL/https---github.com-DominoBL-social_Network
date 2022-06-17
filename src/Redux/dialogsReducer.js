const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState =    {
    messages: [
        {id: 0, message: 'Hi'},
        {id: 1, message: 'Hi, how are you?'},
        {id: 2, message: 'I`m good enough'},
        {id: 3, message: 'Nice'},
        {id: 4, message: 'You are welcome'},
        // {id: 5, message: 'You are welcome'},
    ],
    dialogs: [
        {id: 0, name: 'Ravil'},
        {id: 1, name: 'Julia'},
        {id: 2, name: 'Egor'},
        {id: 3, name: 'Nikita'},
        {id: 4, name: 'Artem'},
    ],

    
}

const dialogsReducer = (state = initialState, action) => {
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
export const sendMessageCreator =(newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });


export default dialogsReducer;





