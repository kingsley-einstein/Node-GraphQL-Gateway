
export class ProfileResolvers {
  create(client, args) {
    return new Promise((resolve, reject) => {
      client.createProfile(args).then((result) => {
        resolve(result);
      });
    });
  }
  update(client, args) {
    return new Promise((resolve, reject) => {
      client.editProfile(args.id, args.input).then((result) => {
        resolve(result);
      });
    });
  }
  getProfile(client, args) {
    return new Promise((resolve, reject) => {
      client.getProfileById(args.id).then((result) => {
        resolve(result);
      });
    });
  }
  getProfileByUser(client, args) {
    return new Promise((resolve, reject) => {
      client.getProfileByUserId(args.id).then((result) => {
        resolve(result);
      });
    });
  }
}
