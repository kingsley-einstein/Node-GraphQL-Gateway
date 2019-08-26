import {Eureka} from 'eureka-js-client';

export default class EurekaConfig {
  configure(opts) {
    this.eureka = new Eureka({
      eureka: {
        fetchRegistry: opts.fetchRegistry,
        registerWithEureka: opts.registerWithEureka,
        host: opts.host,
        port: opts.eureka_port,
        preferIpAddress: true,
        servicePath: opts.servicePath,
        fetchMetadata: true
      },
      instance: {
        app: opts.app,
        hostName: opts.hostName,
        ipAddr: opts.ipAddr,
        port: opts.port,
        vipAddress: opts.vipAddress,
        dataCenterInfo: {
          // eslint-disable-next-line quote-props
          name: 'MyOwn',
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo'
        }
      }
    });
  }
}
