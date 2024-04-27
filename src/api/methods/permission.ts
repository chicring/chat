import request from "../index";


export function saveChannelPermission() {
  return request({
    url: '/channel',
    method: 'post',
  });
}

export function getChannelPermission(query: { page: number , size : number , search : string } ) {
  return request({
    url: '/permission',
    method: 'get',
    params: {
      page: query.page,
      size: query.size,
      search: query.search
    }
  });
}

export function updateChannelPermission(channel: { id: number, permission: string }) {
  return request({
    url: '/permission',
    method: 'put',
    data: channel
  });
}

export function deleteChannelPermission(id: number) {
  return request({
    url: `/permission/${id}`,
    method: 'delete'
  });
}
