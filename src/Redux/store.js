// import profileReducer from "./profileReducer";
// import dialogsReducer from "./dialogsReducer";
// import sideBarReducer from "./sideBarReducer";


// let store = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 0, post: 'Hi, what`s up', likesCount: 12},
//                 {id: 1, post: 'Hey, i am good enough', likesCount: 412}
//             ],
//             newPostText: 'Ravil'

//         },
//         dialogsPage: {
//             messages: [
//                 {id: 0, message: 'Hi'},
//                 {id: 1, message: 'Hi, how are you?'},
//                 {id: 2, message: 'I`m good enough'},
//                 {id: 3, message: 'Nice'},
//                 {id: 4, message: 'You are welcome'},
//             ],
//             dialogs: [
//                 {id: 0, name: 'Ravil'},
//                 {id: 1, name: 'Julia'},
//                 {id: 2, name: 'Egor'},
//                 {id: 3, name: 'Nikita'},
//                 {id: 4, name: 'Artem'},
//             ],

//             newMessageBody: ''

//         },
//         sideBar: {},
//     },
//     _callSubscriber() {
//         console.log('State was changed')
//     },

//     getState() {
//         return this._state;
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer; // pattern
//     },

//     dispatch(action) { // {type: 'ADD-POST' }

//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//         this._state.sideBar = sideBarReducer(this._state.sideBar, action)

//         this._callSubscriber(this._state);
//       }
//     }

//     window.store = store ;
//     export default store;