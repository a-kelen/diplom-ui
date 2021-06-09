import Axios from 'axios'
import https from 'https' 
let url = ""
if(process.env.NODE_ENV == 'development')  {
    url = 'https://localhost:44345/api/';
}
else
    url = 'https://u1400620.plsk.regruhosting.ru/api/'

console.log(process.env)

const api = Axios.create({
    baseURL: url,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    headers: {"Access-Control-Allow-Origin": "*"}
    
})

api.defaults.withCredentials = true

export default api

