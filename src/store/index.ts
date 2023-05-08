import { legacy_createStore, compose, applyMiddleware } from "redux"
import combineReducers from './combineReducers'
import reduxThunk from "redux-thunk"
import handleNum from "./NumStatus"

// 组合各个模块的reducer
const reducers = combineReducers({
  handleNum
})
// 判断有没有__REDUX_DEVTOOLS_EXTENSION_COMPOSE__这个模块
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose //rt

// 把仓库数据，浏览器redux-dev-tools，还有reduxThunk插件关联在store中
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));
export default store