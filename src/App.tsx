import { DatePicker, Space } from 'antd';
import routes from "@/router";
import { useRoutes } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
function App() {
  const { t } = useTranslation()
  const element = useRoutes(routes)
  return (
    <>
      <div>{t('name')}</div>
      {element}
      <Space direction="vertical"><DatePicker /></Space>
    </>
  )
}

export default App
