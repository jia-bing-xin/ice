import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import BaiduMapWithECharts from "@/components/GlobeEchart";
import { Button } from 'antd';
import './styles/index.scss'
import axios from "axios";
import { useEffect, useState } from "react";
const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/home')
  }
  const [chinaGeo, setChinaGeo] = useState([[]])
  useEffect(() => {
    axios.get('https://geo.datav.aliyun.com/areas_v3/bound/100000.json').then((res) => {
      setChinaGeo(res.data.features[0].geometry.coordinates[0][0])
    })
  }, [])
  return <div className="login-box">
    {/* <div className="login-echart"> */}
    <BaiduMapWithECharts chinaGeo={chinaGeo} />
    {/* </div> */}
    <div className="login-form">
      <Button type="primary" onClick={goHome}>{t('login')}</Button>
    </div>
  </div>
}
export default Login