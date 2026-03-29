declare const OSS: any;

export const getClient = (params: any) => {
  const client = new OSS(params);
  return client;
};
