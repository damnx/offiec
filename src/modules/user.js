import axios from 'axios'
import Config from '../utils/Config'

export function login(data) {
    return axios({
        method: 'post',
        url: Config.oauth_base_url + "/oauth/token",
        data: {
            'grant_type': 'password',
            'client_id': Config.app_id,
            'client_secret': Config.app_secret_key,
            'username': data.email,
            'password': data.password,
            'scope': '*'
        }
    })
}

export function me(data) {
    return axios({
        method: 'post',
        url: Config.oauth_base_url + "/api/me",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        },
        data: {
            'username': data.email,
            'password': data.password,
        }
    })
}

export function register(data) {
    return axios({
        method: 'post',
        url: Config.oauth_base_url + "/api/register",
        headers: {
            'Accept': 'application/json',
        },
        data: data.data
    })
}

export function getListUser(data) {
    return axios({
        method: 'get',
        url: Config.oauth_base_url + "/api/get-list-users",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        }
    })
}


