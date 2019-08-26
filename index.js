import express from 'express';
import {CloudConfig, FeignClientConfig, EurekaConfig} from './config';
import {GraphQLConfig} from './graphql/config';

const cloudConfig = new CloudConfig();
const feignConfig = new FeignClientConfig();
const eurekaConfig = new EurekaConfig();
const graphQLConfig = new GraphQLConfig();

const port = 4600;

cloudConfig.configure().then(() => {
  const opts = {
    user_client: {
      apiDescription: {
        createUser: {
          method: 'POST',
          uri: '/api/v1/create'
        },
        getUser: {
          method: 'GET',
          uri: '/api/v1/user/{id}'
        },
        getUsers: {
          method: 'GET',
          uri: '/api/v1/users'
        },
        editUser: {
          method: 'PUT',
          uri: '/api/v1/user/{id}'
        },
        deleteUser: {
          method: 'DELETE',
          uri: '/api/v1/user/{id}'
        }
      },
      baseUrl: cloudConfig._user_client_host,
    },
    profile_client: {
      apiDescription: {
        createProfile: {
          method: 'POST',
          uri: '/api/v1/profile'
        },
        editProfile: {
          method: 'PUT',
          uri: '/api/v1/profile/{id}'
        },
        getProfileById: {
          method: 'GET',
          uri: '/api/v1/profile/{id}'
        },
        getProfileByUserId: {
          method: 'GET',
          uri: '/api/v1/profile/byuser/{id}'
        }
      },
      baseUrl: cloudConfig._profile_client_host,
    },
    fetchRegistry: cloudConfig._fetchRegistry,
    registerWithEureka: cloudConfig._register_with_eureka,
    eureka_port: cloudConfig._eurekaPort,
    host: cloudConfig._eurekaHost,
    hostName: cloudConfig._instanceHostName,
    ipAddr: cloudConfig._instanceIp,
    port: {
      // eslint-disable-next-line quote-props
      $: port,
      '@enabled': true
    },
    vipAddress: cloudConfig._instanceVip,
    app: cloudConfig._serviceName,
    servicePath: '/eureka/apps/'
  };
  eurekaConfig.configure(opts);
  feignConfig.configure(opts);
  graphQLConfig.configure(feignConfig.userClient, feignConfig.profileClient);
  const app = express();

  app.use('/graph', graphQLConfig.gql);

  app.listen(port, () => {
    eurekaConfig.eureka.start((err, rest) => {
      if (err) throw err;
    });
    console.log(`Server running on port ${port}`);
  });
});
