import mitt, { type Handler } from 'mitt'

interface Option {
    name: string // 事件名称
    callback: Handler<unknown> // 回调
}

const emitter = mitt()

export const useEmitt = (option?: Option) => {
    if (option) {
        emitter.on(option.name, option.callback)

        onBeforeUnmount(() => {
            emitter.off(option.name)
        })
    }

    return emitter
}
