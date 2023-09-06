import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import BaiduMapWithECharts from "@/components/GlobeEchart";
import { Button } from 'antd';

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/home')
  }
  return <>
    <BaiduMapWithECharts />
    <Button type="primary" onClick={goHome}>{t('login')}</Button>
  </>
}
export default Login