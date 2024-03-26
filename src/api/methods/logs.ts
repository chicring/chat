import request from "../index";
import { LogQuery } from "@/types/log";

export function getLogs(query: LogQuery) {
  return request({
    url: '/logs/find',
    method: 'post',
    data: query
  });
}

export function getLogCountDetail() {
  return request({
    url: '/logs/amount',
    method: 'get',
  });
}


export function getOverview() {
  return request({
    url: '/logs/overview',
    method: 'get',
  });
}
