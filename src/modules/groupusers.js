import axios from 'axios'
import Config from '../utils/Config'
import { encodeData } from '../utils/index';

export function createGroupUsers(data) {
    return axios({
        method: 'post',
        url: Config.oauth_base_url + "/api/create-group-users",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        },
        data: data.inputs
    })
}

export function getListGroupUsersPaginate(data) {

    return axios({
        method: 'get',
        url: Config.oauth_base_url + "/api/get-list-group-users?" + encodeData(data.inputs),
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        }
    })
}

export function getListGroupUsers(data) {
    return axios({
        method: 'get',
        url: Config.oauth_base_url + "/api/get-all-group-users",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        }
    })
}

export function editGroupUsers(data) {
    return axios({
        method: 'put',
        url: Config.oauth_base_url + "/api/update-group-users/" + data.id,
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        },
        data: data.inputs
    })
}


export function destroyGroupUsers(data) {
    return axios({
        method: 'delete',
        url: Config.oauth_base_url + "/api/delete-group-users/" + data.id,
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + data.access_token
        }
    })
}