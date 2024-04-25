import request from "../index";


export function getKnowledgeBaseList() {
  return request({
    url: '/knowledgeBase/list',
    method: 'get',
  });
}

export function getKnowledgeBaseFile(id: number) {
  return request({
    url: `/knowledgeBase/${id}`,
    method: 'get',
  });
}
