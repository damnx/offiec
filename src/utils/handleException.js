import history from './history';
import Session from './Session'

const handleException = function* (error) {
    if (error.response) {
        switch (error.response.status) {
            case 401:
            case "401":
                Session.remove();
                history.push('/login');
                break;
            case "403":
            case 403:
                history.push('/403')
                break;
            case "500":
            case 500:
                history.push('/500')
                break;
            case 404:
                history.push('/404')
                break;
            default:
                console.log(error)
        }
    } else {
        console.log(error)
    }
}

export default handleException