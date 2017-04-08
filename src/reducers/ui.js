/**
 * Created by dyk on 2017/1/14.
 */
import * as uiAction from '../actions/uiAction'

const initialState = {
    menuCollapsed: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case uiAction.COLLAPSED:
            return {...state, menuCollapsed: !state.menuCollapsed}
        default:
            return state
    }
}