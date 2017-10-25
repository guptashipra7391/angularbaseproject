import * as AuthActionList from './auth.actions';

export interface State {
    token: string,
    authenticated: boolean,
    isSignedUp:boolean
}
const intialState: State = {
    token: localStorage.getItem("authToken")? localStorage.getItem("authToken"):"",
    authenticated:localStorage.getItem("authToken")?true:false,
    isSignedUp:localStorage.getItem("authToken")?true:false
}
export function authReducer(state = intialState, action: AuthActionList.AuthActionList) {
    switch (action.type) {
        case AuthActionList.SIGNIN:
        return {
            ...state,
            authenticated: true
        }
        case AuthActionList.SIGNUP:
        return {
            ...state,
            isSignedUp: true
        }

        case AuthActionList.LOGOUT:

            return {
                ...state,
                authenticated: false,
                token:""
            }
        case AuthActionList.SET_TOKEN:

            return {
                ...state,
                authenticated: true,
                token:action.payload
            }
        default:
            return state;


    }
}