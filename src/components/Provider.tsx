import { useState } from 'react';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ConfigProvider } from 'antd';
import { useEvent } from '@/hook/useEvent';
import { useTranslation } from 'react-i18next'

type Props = {
    children: JSX.Element
}

export default function Provider(props: Props) {
    const { i18n } = useTranslation()
    const [lang, setLang] = useState(localStorage.getItem("lang") || 'zh')
    useEvent({
        name: "lang", callback: (val: string) => {
            localStorage.setItem("lang", val)
            i18n.changeLanguage(val)
            setLang(val)
            dayjs.locale(val)
        }
    })
    return (
        <ConfigProvider locale={lang === 'zh' ? zhCN : enUS}>
            {props.children}
        </ConfigProvider>
    )
}