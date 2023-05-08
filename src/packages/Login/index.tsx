import { useDispatch } from "react-redux"
import numStatus from "@/store/NumStatus"
import { useNavigate } from "react-router-dom"
import { Button } from 'antd';

const Login = () => {
    const navigate = useNavigate()
    const goHome = () => {
        navigate('/home')
    }
    const dispatch = useDispatch();
    const changeStore = () => {
        dispatch({ type: "add3", val: 100 })
        dispatch(numStatus.asyncActions!.asyncAdd1 as any)
    }
    return (
        <>
            <div onClick={goHome}>login</div>
            <Button type="primary" onClick={changeStore}>store</Button>
        </>)
}
export default Login