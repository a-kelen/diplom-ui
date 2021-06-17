import Axios from 'axios'
import https from 'https' 
let url = ''
if(process.env.NODE_ENV == 'development')  {
    url = 'https://localhost:44345/api/'
}
else
    url = 'https://u1400620.plsk.regruhosting.ru/api/'


const api = Axios.create({
    baseURL: url,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    
    
})
api.interceptors.response.use((response) => {
        return response
    },
    function (err) {
        let original = err.config
        
        if(err.config.url === 'User/refresh-token') return err
        
        return api.post('User/refresh-token').then(resp => {
            
            if(resp.data.error) return
            return api(original)
        })
    }
)

api.defaults.withCredentials = true
export default api

