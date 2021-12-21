let  xhr = new XMLHttpRequest();
xhr.open( 'POST', 'http://localhost:3000/data' , true );
xhr.setRequestHeader("Content-Type","application/json");
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4 || xhr.status !== 200) {
    return;
  }
  console.log(xhr.responseText);
};
const pgfun = 'oauth2.svr_generate_refresh_access_token';
const content = {
  "user_name":"u4",
  "user_password":"oigapuvg",
  "client_id":"a2c0e4ea-31d3-4657-86e2-ff8baa720ebb",
  "client_secret":"e4e0f69a2dab2d37e4f3f3e3e4838cf2"
};
const body = {
  pgfun:pgfun,
  content:JSON.stringify(content)
}
// formData.append('pgfun',pgfun);
// formData.append('content',JSON.stringify(content));

xhr.send(JSON.stringify(body));

