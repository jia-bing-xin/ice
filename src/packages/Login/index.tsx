import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const goHome = () => {
        navigate('/home')
    }
    return (<div onClick={goHome}>login</div>)
}
export default Login