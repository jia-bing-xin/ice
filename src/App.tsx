import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DatePicker, Space } from 'antd';
import routes from "@/router";
import { useRoutes } from 'react-router-dom';
function App() {
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState('zh')
  const element = useRoutes(routes)
  const fn = () => {
    setLang(lang == 'zh' ? 'en' : 'zh')
    i18n.changeLanguage(lang)
  }
  return (
    <>
      <div onClick={fn}>{t('name')}</div>
      {element}
      <Space direction="vertical"><DatePicker /></Space>
    </>
  )
}

export default App
