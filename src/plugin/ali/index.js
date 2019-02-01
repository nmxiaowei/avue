export const getClient = (params) => {
  //oss 基本配置
  var client = new OSS(params)
  return client;
}