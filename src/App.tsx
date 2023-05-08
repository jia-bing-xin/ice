import { DatePicker, Space } from 'antd';
import { useSelector } from "react-redux"
import routes from "@/router";
import { useRoutes } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
function App() {
  const { t } = useTranslation()
  const element = useRoutes(routes)
  const num = useSelector((state: RootState) => state.handleNum.num)
  return (
    <>
      <div>{t('name')}-----{num}</div>
      {element}
      <Space direction="vertical"><DatePicker /></Space>
    </>
  )
}

export default App
