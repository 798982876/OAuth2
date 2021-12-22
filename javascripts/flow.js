import { cookie, client, user } from "./dataStructure.js";
import { Service } from "./oauth.js";







//Step2,获得用户输入的用户名和密码，并作为userInfo
function getInfo() {
    let userName = document.querySelector('#userName').value;
    let userPassword = document.querySelector('#userPassword').value;
    user.updateUserInfo(userName, userPassword);
    console.log(user);
    // return user;
}


//Step3.依据用户名和密码获得access_token和refresh_token
async function getRAToken() {
    const { userName, userPassword } = user.getUserInfo();
    console.log(user.getUserInfo());
    const { clientId, clientSecret } = client.getClientInfo();
    const pgfun = 'oauth2.svr_generate_refresh_access_token';
    const content = {
        "user_name": userName,
        "user_password": userPassword,
        "client_id": clientId,
        "client_secret": clientSecret
    };
    console.log(content);
    const xhr = await Service(pgfun, content);
    console.log('xhr', xhr);
    if (xhr.readyState === 4 && xhr.status !== 200) {
        alert("用户名或密码出错");
        return false;
    }
    else if (xhr.readyState === 4 && xhr.status === 200) {
        let res = JSON.parse(xhr.response);
        const { accessToken, refreshToken } = { accessToken: res[0]["result"]["access_token"], refreshToken: res[0]["result"]["refresh_token"] };
        cookie.setRATToken(accessToken, refreshToken);
        return true;
    }
}
//Step4.依据access_token获得所有的资源菜单
async function getResourceIds() {
    const { clientId, clientSecret } = client.getClientInfo();
    const accessToken = cookie.getAccessToken();
    if (accessToken === null) {
        console.log("跳转到登录界面，重新获得access_token");
        return false;
    } else {
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
            console.log("access_token失效",xhr);
            console.log("跳转到登录界面，重新获得access_token");
            
            return false;
        }
        else if (xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.response);
            let res = JSON.parse(xhr.response);
            user.updateResourceList(res[0]["result"])
            return true;
        }
    }
}


async function mySubmit(e) {
    console.log(e.target);
    getInfo();
    let setRAT = await getRAToken();
    if (!setRAT) {
        return;
    }
    await getResourceIds();
    // if(resourceList === false){
    //     return;
    // }
    // console.log(resourceList,"跳转至用户资源列表页");
    // return resourceList;

}
document.querySelector("#form").addEventListener("click", mySubmit);

// if(user.getReourceList!==null){
//     window.location.replace("resource.html");
// }

// export{user,client,cookie};