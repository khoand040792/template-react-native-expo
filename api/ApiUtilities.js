let apiLogin = 'http://apiubb.bachthuan.com/api/account/login';
let apiRegister = 'http://apiubb.bachthuan.com/api/account/register';
let apiForgotPass = 'http://apiubb.bachthuan.com/api/account/forgotpassword';
let apiSuport = 'http://apiubb.bachthuan.com/api/support/send';
let apiChangeEmail = ''; // remove
let apiChangePass = 'http://apiubb.bachthuan.com/api/account/changepassword';
let apiGetListHistories = 'http://apiubb.bachthuan.com/api/request/requesthistory';
let apiSendFeedback = 'http://apiubb.bachthuan.com/api/request/feedback';
let apiUpdateUserProfile = 'http://apiubb.bachthuan.com/api/account/changeprofile';
let apiGetListNotifies = '';
let PUSH_ENDPOINT = 'http://apiubb.bachthuan.com/api/account/devicetoken';
let apiGetUserProfile = 'http://apiubb.bachthuan.com/api/account/userprofile';
let apiSearchHistory = '';
let apiLoginSocial = '';
let apiCreateRequestMap = 'http://apiubb.bachthuan.com/api/request/sendrequest';
let apiChangeSettingPost = 'http://apiubb.bachthuan.com/api/account/changenotifys';
let apiChangeSettingsGet = 'http://apiubb.bachthuan.com/api/account/getnotifys';
let apiGetListMarker = 'http://apiubb.bachthuan.com/api/request/information';

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
 * @param {*} token : string // token auth2
 * @param {*} tokenDevice : string // token device to send notify
 */
export const SaveTokenDevice = function (token, tokenDevice) {
    return fetchApi(PUSH_ENDPOINT, 'POST', {
        TokenDevice: tokenDevice
    }, token);
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

/**
 * 
 * @param {*} register : object
 */
export const Register = function (register) {
    return fetchApi(apiRegister, 'POST', {
        FullName: register.FullName,
        Email: register.Email,
        Phone: register.Phone,
        Password: register.Password
    });
}

/**
 * 
 * @param {*} emailOrPhone : string
 */
export const ForgotPassword = function (emailOrPhone) {
    return fetchApi(apiForgotPass, 'POST', {
        email: emailOrPhone
    });
}

/**
 * 
 * @param {*} supportInfor : object
 */
export const Support = function (supportInfor, token) {
    return fetchApi(apiSuport, 'POST', {
        FullName: supportInfor.FullName,
        Phone: supportInfor.Phone,
        Content: supportInfor.Content
    }, token);
}

/**
 * 
 * @param {*} emailNew : string
 */
export const ChangeEmail = function (emailNew) {
    return fetchApi(apiChangeEmail, 'POST', {
        emailNew: emailNew
    });
}

/**
 * @param {*} passInfor : object
 * @param token: string
 */
export const ChangePassword = function (passInfor, token) {
    return fetchApi(apiChangePass, 'POST', {
        OldPassword: passInfor.passOld,
        NewPassword: passInfor.passNew,
        ConfirmPassword: passInfor.passConfirm
    }, token);
}

/**
 * @param {*} token : string
 */
export const GetListHistories = function (token) {
    return fetchApi(apiGetListHistories, 'GET', null, token);
}

/**
 * @param {*} token : string
 */
export const GetListNotifies = function (token) {
    return fetchApi(apiGetListNotifies, 'GET', null, token);
}

/**
 * @param {*} token : string
 * @param feebback : object 
 */
export const SendFeedback = function (feebback, token) {
    return fetchApi(apiSendFeedback, 'POST', {
        "RequestId": feebback.requestId,
        "Rate": feebback.rate,
        "Content": feebback.content
    }, token);
}
/**
 * @param {*} token : string
 * @param {*} fullName : string
 * @param {*} address : string
 */
export const UpdateUserProfile = function (fullName, address, token) {
    return fetchApi(apiUpdateUserProfile, 'POST', {
        FullName: fullName,
        Address: address
    }, token);
}

/**
 * @param {*} token : string
 */
export const GetUserProfile = function (token) {
    return fetchApi(apiGetUserProfile, 'GET', null, token);
}

/**
 * @param {*} token : string
 * @param createRequest : object 
 */
export const SendRequest = function (createRequest, token) {
    return fetchApi(apiCreateRequestMap, 'POST', {
        "Address": createRequest.Address,
        "ProductId": createRequest.ProductId,
        "MachineId": createRequest.ProductId,
        "Area": createRequest.Area,
        "Money": createRequest.Money,
        "Longitude": createRequest.Longitude,
        "Latitude": createRequest.Latitude
    }, token);
}

/**
 * @param {*} token : string
 * @param {*} active : string
 */
export const ChangeSettingsPost = function (active, token) {
    return fetchApi(apiChangeSettingPost, 'POST', {
        Active: active
    }, token);
}

/**
 * @param {*} token : string
 */
export const ChangeSettingsGet = function (token) {
    return fetchApi(apiChangeSettingsGet, 'GET', null, token);
}

/**
 * @param {*} token : string
 * @param {*} latitude : number
 * @param {*} longitude : number
 */
export const GetListMarker = function (latitude, longitude, token) {
    return fetchApi(apiGetListMarker, 'GET', null, token);
}
