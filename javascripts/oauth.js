export async function Service(pgfun, content) {

  const  xhr = new XMLHttpRequest();
  let  response = null;
  xhr.open('POST', 'http://localhost:3000/data', false);//false意为同步
  xhr.setRequestHeader("Content-Type", "application/json");
  const body = {
    pgfun: pgfun,
    content: JSON.stringify(content)
  }
  xhr.send(JSON.stringify(body));

  // const responseData = xhr.response;
  
  
  return xhr;
  // console.log('xhr',xhr);

}


