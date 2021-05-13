import Axios from 'axios'
import https from 'https' 

const api = Axios.create({
    baseURL: 'https://localhost:44345/api/',
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})


export default api

