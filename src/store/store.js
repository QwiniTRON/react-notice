import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {mainStore} from './mainReducer'

export const store = createStore(mainStore, applyMiddleware(thunk))