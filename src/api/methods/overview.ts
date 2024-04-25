import request from "../index";

export function getRequestCount() {
  return request({
    url: '/overview/request-Count',
    method: 'get',
  });
}

export function getModelUsageStats() {
  return request({
    url: '/overview/model-usage-stats',
    method: 'get',
  });
}

export function getTotalModelUsageRatio(timestamp : number) {
  return request({
    url: '/overview/model-usage-ratio',
    method: 'get',
    params: {
      timestamp
    }
  });
}

export function getUserUsageRatio(timestamp : number) {
  return request({
    url: '/overview/user-usage-ratio',
    method: 'get',
    params: {
      timestamp
    }
  });
}

export function getCountOfUsersByRole() {
  return request({
    url: '/overview/user-count',
    method: 'get',
  });
}

export function getAllAvailableModels() {
  return request({
    url: '/overview/all-models',
    method: 'get',
  });
}
