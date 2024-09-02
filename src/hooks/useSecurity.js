import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import request from "../utils/ApiRequest";
import useHttp from "./useHttp";
import { useLocalStorage } from '@uidotdev/usehooks'
import { setSystemName } from "../store/slice/SystemSlice";
const useSecurity = () => {
    const dispatch = useDispatch()
    const { post, get } = useHttp()

    const [token, saveToken] = useLocalStorage('auth-token', null)

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        pwd: ''
    })

    const login = async () => {
        const data = await post('/api/v1/login', {}, {username: loginInfo.username, pwd: loginInfo.pwd})
        console.log('data = ' + data)
        const evidence = {
            ...data,
            loginTime: Date.now()
        }
        saveToken(evidence)
    }

    const logout = () => {
        saveToken(null)
    }
    const isLogin = () => {
        if (token != null) {
            if ((Date.now() - token.loginTime) <= token.expiry) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    const getSystemName = async () => {
        const systemName = await get('/api/v1/getSystemName')
        dispatch(setSystemName(systemName))
    }
    return {
        loginInfo,
        setLoginInfo,
        login,
        logout,
        isLogin,
        getSystemName
    }

}

export default useSecurity