import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR ,AUTH_CHECK, AUTH_GET_PERMISSIONS} from 'admin-on-rest';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request('http://104.197.178.172:8080/cmad_app/api/auth/signin', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ accessToken }) => {
                localStorage.setItem('token', accessToken);
                localStorage.setItem('role', role);
            });
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }

    if (type === AUTH_ERROR) {
        const status  = params.message.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }

    if (type === AUTH_GET_PERMISSIONS) {
        const role_list = localStorage.getItem('role');

        var role ="ROLE_USER";

        if(role_list.indexOf('ROLE_ADMIN') > -1){

            role = "ROLE_ADMIN";
        }
        return Promise.resolve(role);
    }

    return Promise.reject('Unkown method');
}