// import style from './styles'
import { useNavigate } from "react-router-dom"
import { Button } from 'antd';
import { useEvent } from "@/hook/useEvent";
import { useState } from 'react'
const home = () => {
    const navigate = useNavigate()
    const event = useEvent()
    const [lang, setLang] = useState('zh')
    const goLogin = () => {
        navigate('/login')
    }
    const changeLang = () => {
        setLang(lang == 'zh' ? 'en' : 'zh')
        event.emit('lang', lang)
    }
    return (<>
        <div onClick={goLogin}>home</div>
        <Button type="primary" onClick={changeLang}>event</Button>
    </>)
}
export default home