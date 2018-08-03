import axios from 'axios'
import Config from '../utils/Config'

export function createGroupUsers(data) {
    return axios({
        method: 'post',
        url: Config.oauth_base_url + "/api/create-group-users",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        },
        data: data.data
    })
}

export function getListGroupUsers(data) {
    return axios({
        method: 'get',
        url: Config.oauth_base_url + "/api/get-all-group-users?page_size=" + data.page_size + "&page=" + data.page,
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        }
    })
}
