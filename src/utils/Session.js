export default class Session {
    static get = () => {
        return JSON.parse(window.localStorage.getItem('session'))
    }

    static set = (sessionValue) => {
        window.localStorage.setItem('session', JSON.stringify(sessionValue))
    }

    static remove = () => {
        window.localStorage.removeItem('session')
    }
}

