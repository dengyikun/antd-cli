/**
 * Created by dyk on 2017/1/20.
 */
import * as userAction from '../actions/userAction'

const initialState = {
    url: '',
    name: '',
    nick_name: '',
    role: '',
    sex: '',
    job: '',
    region: '',
    filiale: '',
    projects: [],
}
export default (state = initialState, action) => {
    switch (action.type) {
        case userAction.SETUSER:
            return {...state, ...action.payload}
        case userAction.USERLOGOUT:
            return {...state, initialState}
        default:
            return state
    }
}