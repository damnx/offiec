export const encodeData = (data) => {
    let params = []
    for (let i in data) {
        if (data[i]) {
            params.push(i + "=" + data[i])
        }

    }
    let paramsString = params.join("&")
    return paramsString;
}

export const decodeUrl = (search) => {
    if (!search) {
        return null
    }
    let params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    return params;
}