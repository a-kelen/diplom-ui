import Axios from 'axios'
import https from 'https' 
let url = ""
if(process.env.NODE_ENV == 'development')  {
    url = 'https://localhost:44345/api/';
}
else
    url = 'https://composdevapi.herokuapp.com/'

console.log(process.env)

const api = Axios.create({
    baseURL: url,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

api.defaults.withCredentials = true

export default api

