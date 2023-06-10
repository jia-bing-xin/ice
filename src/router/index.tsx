import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import type { RouteObject } from "react-router-dom"


const Login = lazy(() => import("@/views/Login"))
const Home = lazy(() => import("@/views/Home"))
const InitializeLoading = lazy(() => import("@/components/Loading/initialize"))

const withLoadingComponent = (comp: JSX.Element, loading = <InitializeLoading />) => (
    <React.Suspense fallback={loading}>
        {comp}
    </React.Suspense>
)

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to='/home' />
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