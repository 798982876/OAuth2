import { Cookie, Client, User } from "./dataStructure.js";
import { Service } from "./oauth.js";


//Step1,初始化实例，以存储数据
// const cookie = new Cookie();
const client = new Client();
const user = new User();

// export {cookie,client,user};




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
        // cookie.setRATToken(accessToken, refreshToken);
        document.cookie="access_token="+accessToken;
        document.cookie="refresh_token="+refreshToken;
        return true;
    }
}


async function mySubmit(e) {
    console.log(e.target);
    getInfo();
    let setRAT = await getRAToken();
    if (!setRAT) {
        return;
    }
    else{
        window.location.href = "resource.html" ;
    }
   
    // if(getResIds){
        
    // }
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