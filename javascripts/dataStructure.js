class Cookie{
    _access_token = null;
    _refresh_token = null;
    constructor(access_token,refresh_token){
        this._access_token = access_token;
        this._refresh_token = refresh_token;
    }
    getAccessToken(){
        return this._access_token;
    }
    getRefreshToken(){
        return this._refresh_token;
    }
    setRATToken(access_token,refresh_token){
        this._access_token = access_token;
        this._refresh_token = refresh_token;
    }
    updateRefreshToken(access_token){
        this._access_token = access_token;
    }

}

class Client{
    client_id = "a2c0e4ea-31d3-4657-86e2-ff8baa720ebb";
    client_secret = "e4e0f69a2dab2d37e4f3f3e3e4838cf2";
    getClientInfo(){
        return{clientId:this.client_id,clientSecret:this.client_secret};
    }
    
}

class User{
    _name = null;
    _password = null;
    _resourceList = null;
    constructor(name,password){
        this._name = name;
        this._password = password;
    }
    getUserInfo(){
        return{userName:this._name,userPassword:this._password};
    }
    updateUserInfo(name,password){
        this._name = name;
        this._password = password;
    }
    getReourceList(){
        return this._resourceList;
    }
    updateResourceList(resourceList){
        this._resourceList = resourceList;
    }

}

//Step1,初始化实例，以存储数据
const cookie = new Cookie();
const client = new Client();
const user = new User();

export {cookie,client,user};

