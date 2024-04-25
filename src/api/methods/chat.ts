import axios from 'axios';

export function testDelay(model: string) {
  const instance = axios.create({
    baseURL: 'http://hk.hjong.cn:8080', // 你的API的base_url
    timeout: 5000, // 请求超时时间
    headers: {
      "Authorization": "95aninjv.1"
    }
  });

  return instance({
    url: '/v1/chat/completions',
    method: 'post',
    data: {
      "messages": [
        {
          "role":"user",
          "content":"请回答 你好 两个字"
        }
      ],
      "model": model
    }
  });
}
