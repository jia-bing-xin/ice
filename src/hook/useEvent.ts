import { useEffect } from 'react'
import { EventEmitter } from "events";

interface Option {
    name: string | symbol // 事件名称
    callback: any // 回调
}
const event = new EventEmitter()

export const useEvent = (option?: Option) => {
    if (option) {
        useEffect(() => {
            event.addListener(option.name, option.callback)
            return () => {
                event.removeListener(option.name, option.callback)
            }
        })
    }
    return event
}
