import instance from "../utils/ApiRequest";
import { useDispatch } from "react-redux";
import { startLoading, endLoading } from "../store/slice/SystemSlice";
const baseUrl = import.meta.env.MODE==='development'?'':'https://ideagenerationservice.azurewebsites.net';
const useHttp = () => {
    // const dispatch = useDispatch()
    
    const request = (url, method, headers, data) => {

        let paramsName = 'data'
        if (method === 'get') {
            paramsName = 'params'
        }
        return new Promise((resolve, reject) => {
            // dispatch(startLoading())
            instance.request({
                method: method,
                url: baseUrl+url,
                headers: headers,
                [paramsName]: data
            }).then(res => {
                if (res.status===200) {
                    resolve(res.data)
                } else {
                    // reject({code: res.data.code, message: res.data.msg})
                    reject({message: '请求失败'})
                }
            }).catch(() => {
                reject({code: 'ERR-00000', message: '网络暂时不可用'})
            }).finally(() => {
                // dispatch(endLoading())
            })
        })
        // return instance.request({
        //         method: method,
        //         url: url,
        //         headers: headers,
        //         [paramsName]: data
        //     })
    }

    const post = (url, headers, data) => {
        return request(url, 'post', headers, data)
    }

    const get = (url, headers, data) => {
        return request(url, 'get', headers, data)
    }

    return {
        post,
        get
    }
}

export default useHttp