
export class UserResolvers {
  create(client, args) {
    return new Promise((resolve, reject) => {
      client.createUser(args).then((result) => {
        resolve(result);
      });
    });
  }
  getById(client, args) {
    return new Promise((resolve, reject) => {
      client.getUser(args.id).then((result) => {
        resolve(result);
      });
    });
  }
  getAll(client) {
    return new Promise((resolve, reject) => {
      client.getUsers().then((result) => {
        resolve(result);
      });
    });
  }
  update(client, args) {
    return new Promise((resolve, reject) => {
      client.editUser(args.id, args.input).then((result) => {
        resolve(result);
      });
    });
  }
  delete(client, args) {
    return new Promise((resolve, reject) => {
      client.deleteUser(args.id).then((result) => {
        resolve(result);
      });
    });
  }
}
