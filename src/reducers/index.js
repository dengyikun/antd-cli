/**
 * Created by dyk on 2017/1/14.
 */

import { combineReducers } from 'redux'
import ui from './ui'
import user from './user'

export default combineReducers({
    ui,
    user
})