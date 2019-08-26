import cloudConfig from 'cloud-config-client';

const opts = {
  name: 'nodegraph',
  endpoint: 'http://localhost:8566'
};

export default class CloudConfig {
  async configure() {
    console.log('Fetching config...');
    const cloud_config = await cloudConfig.load(opts);
    this._profile_client_host = cloud_config.get('profile', 'client', 'host');
    this._user_client_host = cloud_config.get('user', 'client', 'host');
    this._register_with_eureka = cloud_config.get('registerWithEureka');
    this._fetchRegistry = cloud_config.get('fetchRegistry');
    this._eurekaHost = cloud_config.get('eurekaHost');
    this._eurekaPort = cloud_config.get('eurekaPort');
    this._serviceName = cloud_config.get('serviceName');
    this._instanceHostName = cloud_config.get('instance.hostname');
    this._instanceIp = cloud_config.get('instance', 'ip');
    this._instanceVip = cloud_config.get('instance', 'vip');
    Object.keys(this).forEach((val) => {
      console.log(val, this[val]);
    });
  }
}
