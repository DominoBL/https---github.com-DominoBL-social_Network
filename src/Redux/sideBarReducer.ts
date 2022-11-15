
let initialState = {
}
type InitialStateType = {type: typeof initialState}
const sideBarReducer = (state = initialState, action:any):InitialStateType => {
    return state;
}


export default sideBarReducer;