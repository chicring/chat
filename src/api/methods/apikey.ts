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
