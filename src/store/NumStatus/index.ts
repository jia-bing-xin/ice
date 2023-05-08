const store: Store = {
  state: {   // 放数据
    num: 20
  },
  actions: {  // 只放同步的方法
    add1(newState: { num: number }) {
      newState.num++
    },
    add3(newState: { num: number }, action: { type: string, val: number }) {
      newState.num += action.val
    },
  },
  asyncActions: {  // 只放异步的方法
    asyncAdd1(dispatch: Function) {
      setTimeout(() => {
        dispatch({ type: "add1" })
      }, 1000)
    }
  },
  actionNames: {}
}
for (let key in store.actions) {
  store.actionNames[key] = key
}

export default store