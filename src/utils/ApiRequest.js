import axios from "axios"

const instance = axios.create({
    baseURL: '',
    timeout: 300000
})

export default instance