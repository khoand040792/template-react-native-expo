
let apiLogin = 'http://{your_domain}/api/account/login';

/**
 * @param {*} url : string // url remote
 * @param {*} method : string // GET or POST
 * @param {*} dataBody : object // data body
 */

function fetchApi(url, method, dataBody = null, token = '') {
    let header = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(dataBody),
    }

    // remove body if method is get or it not has body
    if (!dataBody) {
        delete header.body;
    }

    if (!token) {
        delete header.headers.Authorization;
    }

    return fetch(url, header).then((response) => {
        if (response.status != 200) {
            return { error: response.status };
        }
        return response.json();
    });
}

/**
 * 
 * @param {*} userName : string
 * @param {*} password : string
 */
export const Login = function (userName, password) {
    // call api login app
    return fetchApi(apiLogin, 'POST', {
        Username: userName,
        Password: password,
    });
}





