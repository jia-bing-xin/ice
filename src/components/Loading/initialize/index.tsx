import style from './styles/index.module.scss'
import viteLogo from '@/assets/svg/vite.svg'
import reactLogo from '@/assets/svg/react.svg'
import { Spin } from 'antd';
const Initialize = () => {
    return (
        <>
            <div className={style.logo}>
                <a href="https://vitejs.dev" className={style.vite_logo} target="_blank">
                    <img src={viteLogo} alt="Vite logo" className={style.vite_img} />
                </a>
                <a href="https://react.dev" className={style.react_logo} target="_blank">
                    <img src={reactLogo} alt="React logo" className={style.react_img} />
                </a>
            </div>
            <div className={style.loading}>
                <Spin size="large" />
            </div>
            <div className={style.title}>
                {import.meta.env.VITE_APP_TITLE}
            </div>
        </>
    )
}
export default Initialize