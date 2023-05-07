import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import type { RouteObject } from "react-router-dom"


const Login = lazy(() => import("@/packages/Login"))
const Home = lazy(() => import("@/packages/Home"))

const withLoadingComponent = (comp: JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to='/login' />
    },
    {
        path: "/login",
        element: withLoadingComponent(<Login />)
    },
    {
        path: "/home",
        element: withLoadingComponent(<Home />)
    },
]

export default routes