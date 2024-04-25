import request from "../index";


export function findAllChannel() {
  return request({
    url: '/channel/find',
    method: 'get',
  });
}

export function addChannel(channel: { name: string, type: string, baseUrl: string, models: string, apiKey: string, priority: number, enableProxy: boolean }) {
  return request({
    url: '/channel/add',
    method: 'post',
    data: channel
  });
}

export function deleteChannel(id: number) {
  return request({
    url: '/channel/delete',
    method: 'get',
    params: { id }
  });
}

export function findAllModel() {
  return request({
    url: '/channel/model/find',
    method: 'get',
  });
}
