import feign from 'feignjs';
import FeignRequest from 'feignjs-request';

export default class FeignClientConfig {
  configure({user_client, profile_client}) {
    this.userClient = feign
        .builder()
        .client(new FeignRequest())
        .target(user_client.apiDescription, user_client.baseUrl);
    this.profileClient = feign
        .builder()
        .client(new FeignRequest())
        .target(profile_client.apiDescription, profile_client.baseUrl);
  }
}
