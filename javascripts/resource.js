import { Service } from "./oauth.js";
import { Client } from './dataStructure.js';

//获得cookie中的cookie
const cookieList = document.cookie.split(';');
const cookie = {}
cookieList.map((v) => {
    let [key, value] = v.trim().split('=');
    cookie[key] = value;
})
console.log(cookie);
const client = new Client();

if (!cookie.access_token) {
    //重定向至登录页
    window.location.href = "oauth.html"
}

async function getResourceIds() {
    const { clientId, clientSecret } = client.getClientInfo();
    const accessToken = cookie.access_token;
    const pgfun = 'oauth2.svr_get_access_token_resource';
    const content = {
        "access_token": accessToken,
        "client_id": clientId,
        "client_secret": clientSecret
    };
    console.log(content);
    const xhr = await Service(pgfun, content);
    console.log('xhr', xhr);
    if (xhr.readyState === 4 && xhr.status !== 200) {
        console.log("access_token失效", xhr);
        console.log("跳转到登录界面，重新获得access_token");
        window.location.href = "oauth.html";
        // return false;
    }
    else if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response);
        let res = JSON.parse(xhr.response);
        return res[0]["result"];
    }
}

let data = await getResourceIds();
console.log(data);


