export const encodeData = (data) => {
    return Object.keys(data).map(function(key) {
        if(typeof data[key] === "object") {            
            let params = []
            for(let i = 0; i<data[key].length; i++) {
                params.push([key + "["+i+"]", data[key][i]].map(encodeURIComponent).join("="))
            }
            let paramsString = params.join("&")
            
            return paramsString
        }

        if(data[key])
            return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
}