import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import style from './styles/index.module.scss'
import loginBoxBg from '@/assets/svg/login-box-bg.svg'
import reactLogo from '@/assets/svg/react.svg'
import { Button } from 'antd';

const Login = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const goHome = () => {
        navigate('/home')
    }
    return (
        <div className={style.login}>
            <div className={style.box}>
                <div className={style.title}>
                    <img src={reactLogo} className={style.react_img} />
                    <span>{import.meta.env.VITE_APP_TITLE}</span>
                </div>
                <div className={style.content}>
                    <img src={loginBoxBg} />
                    <span className={style.tl}>开箱即用的中后台管理系统</span>
                    <span className={style.sy}>输入您的个人详细信息开始使用！</span>
                </div>
            </div>
            <div className={style.from}>
                <Button type="primary" onClick={goHome}>{t('login')}</Button>
            </div>
        </div>)
}
export default Login