import request from "@/api/index";

export function getApiKey (){
  return request({
    url: '/apikey/find',
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  })
}

export function createApiKey (name : string, expiresAt : number ){
  return request({
    url: '/apikey/create',
    method: 'post',
    data: {
      name,
      expiresAt
    }
  })
}

export function deleteApiKey (id : number){
  return request({
    url: '/apikey/delete',
    method: 'get',
    params: {
      id
    }
  })
}
