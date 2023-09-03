import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
// import style from './styles/index.module.scss'
// import loginBoxBg from '@/assets/svg/login-box-bg.svg'
// import reactLogo from '@/assets/svg/react.svg'
import { Button } from 'antd';

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/home')
  }
  return <Button type="primary" onClick={goHome}>{t('login')}</Button>
}
export default Login