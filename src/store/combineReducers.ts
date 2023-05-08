import { combineReducers } from "redux"

//提取reducer
const reducer = (stateData: Store) => {
    return (state = { ...stateData.state }, action: { type: string }) => {
        let newState = JSON.parse(JSON.stringify(state))
        for (let key in stateData.actionNames) {
            if (action.type === stateData.actionNames[key]) {
                stateData.actions![stateData.actionNames[key]](newState, action);
                break;
            }
        }
        return newState
    }
}
//二次封装combineReducers
const reducers = (obj: { [key: string]: Store | any }) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj[key] = reducer(obj[key]);
        }
    }
    return combineReducers(obj)
}
export default reducers