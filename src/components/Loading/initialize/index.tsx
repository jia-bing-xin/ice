import style from './styles/index.module.scss'
import viteLogo from '/vite.svg'
import reactLogo from '/react.svg'
const initialize = () => {
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
                <i></i><i></i><i></i><i></i>
            </div>
            <div className={style.title}>
                {import.meta.env.VITE_APP_TITLE}
            </div>
        </>
    )
}
export default initialize