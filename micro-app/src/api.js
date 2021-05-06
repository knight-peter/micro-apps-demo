/* eslint-disable no-unused-vars */
import { service } from '@biaodian-web/basic';

const {
  axiosService: {
    biaodianApiInstance,
    tokenConfig: axiosTokenConfig, // 修改获取token相关配置
    biaodianApiFetch,
  },
  apolloService: { gql, tokenConfig: apolloTokenConfig, biaodianGraphqlClient: Client },
} = service;
biaodianApiInstance.defaults.baseURL = '';

const apolloClient = new Client({
  base: 'http://localhost:8087',
  uri: '/v2/graphql',
});
