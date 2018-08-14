import axios from 'axios'
import Config from '../utils/Config'

export function createCalendarWork(data) {
    return axios({
        method: 'post',
        url: Config.oauth_base_url + "/api/create-calendar-work",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        },
        data: {
            inputs: data.data,
            group_users: data.group_users
        }
    })
}

export function getCalendarWork(data) {
    return axios({
        method: 'get',
        url: Config.oauth_base_url + "/api/get-calendar-work/" + data.date,
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        }
    })
}