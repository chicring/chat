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

export function getUserInfo (){
  return request({
    url: '/user/info',
    method: 'get'
  })
}

