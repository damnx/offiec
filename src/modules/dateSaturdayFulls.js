
import axios from 'axios'
import Config from '../utils/Config'

export function createDateSaturdayFulls(data) {
    return axios({
        method: 'post',
        url: Config.oauth_base_url + "/api/create-date-saturday-working-full",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        },
        data: data
    })
}