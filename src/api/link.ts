import { service } from "../util/service";
// 封装相关的数据请求

interface linkType {
  url: string,
  method?: string,
  data?: any,
  params?: any,
}

export const link = ({ url, method = "get", data, params }: linkType) => {
  return new Promise((resolve, reject) => {
    service
      .request({
        url,
        method,
        data, // post数据
        params, // get数据
      })
      .then((data: unknown) => {
        resolve(data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
