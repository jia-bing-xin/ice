import style from './styles/index.module.scss'
import { useNavigate } from "react-router-dom"
import { Button } from 'antd';
import { useEvent } from "@/hook/useEvent";
// import { useState } from 'react'
import { useCallbackState } from '@/hook/useCallbackState';
const home = () => {
    const navigate = useNavigate()
    const event = useEvent()
    const [lang, setLang] = useCallbackState(localStorage.getItem("lang") || 'zh')
    const goLogin = () => {
        navigate('/login')
    }
    const changeLang = () => {
        console.log(lang, 1)
        setLang(lang == 'zh' ? 'en' : 'zh', (data: string) => {
            console.log(data, 2)
            event.emit('lang', data)
        })
    }
    return (<>
        <div onClick={goLogin} style={style}>home</div>
        <Button type="primary" onClick={changeLang}>event</Button>
    </>)
}
export default home