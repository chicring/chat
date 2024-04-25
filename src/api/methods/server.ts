import request from "@/api/index";


export function getServerInfo (){
  return request({
    url: '/status',
    method: 'get'
  })
}
