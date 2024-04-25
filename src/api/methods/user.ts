import request from "@/api/index";


export function doLogin(account : string, pwd : string) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      account,
      pwd
    }
  });
}

export function doRegister(username : string, password : string, email : string) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password,
      email
    }
  });
}

export function getUserInfo (){
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function sendCode (email : string){
  return request({
    url: '/user/ask-code',
    method: 'get',
    params: {
      email
    }
  })
}

export function resetPwdByEmail (email : string, code : string, password : string){
  return request({
    url: '/user/reset',
    method: 'post',
    data: {
      email,
      code,
      password
    }
  })
}
