import { Navigate } from "react-router-dom";

import useSecurity from "../hooks/useSecurity";

export const ProtectedRoute = ({children}) => {

    const { isLogin } = useSecurity()

    if (!isLogin()) {
        return <Navigate to="/" />
    }
    return children
}