import expressGraphQL from 'express-graphql';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLSchema
} from 'graphql';
import {Profile, User} from '../models';
import {ProfileResolvers, UserResolvers} from '../resolvers';
import {ProfileUpdateInput, UserUpdateInput} from '../inputs';

const profileResolvers = new ProfileResolvers();
const userResolvers = new UserResolvers();

export class GraphQLConfig {
  configure(userClient, profileClient) {
    const Mutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        createUser: {
          type: new GraphQLNonNull(User),
          args: {
            username: {
              type: new GraphQLNonNull(GraphQLString)
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: (_, args) => userResolvers.create(userClient, args)
        },
        updateUser: {
          type: new GraphQLNonNull(User),
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID)
            },
            input: {
              type: new GraphQLNonNull(UserUpdateInput)
            }
          },
          resolve: (_, args) => userResolvers.update(userClient, args)
        },
        deleteUser: {
          type: GraphQLString,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID)
            }
          },
          resolve: (_, args) => userResolvers.delete(userClient, args)
        },
        createProfile: {
          type: new GraphQLNonNull(Profile),
          args: {
            firstName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            userId: {
              type: new GraphQLNonNull(GraphQLID)
            }
          },
          resolve: (_, args) => profileResolvers.create(profileClient, args)
        },
        updateProfile: {
          type: new GraphQLNonNull(Profile),
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID)
            },
            input: {
              type: new GraphQLNonNull(ProfileUpdateInput)
            }
          },
          resolve: (_, args) => profileResolvers.update(profileClient, args)
        }
      }
    });
    const Query = new GraphQLObjectType({
      name: 'Query',
      fields: {
        getUserById: {
          type: new GraphQLNonNull(User),
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID)
            }
          },
          resolve: (_, args) => userResolvers.getById(userClient, args)
        },
        getAllUsers: {
          type: new GraphQLList(User),
          resolve: (_, args) => userResolvers.getAll(userClient)
        },
        getProfile: {
          type: new GraphQLNonNull(Profile),
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID)
            }
          },
          resolve: (_, args) => profileResolvers.getProfile(profileClient, args)
        },
        getProfileByUser: {
          type: new GraphQLNonNull(Profile),
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLID)
            }
          },
          resolve: (_, args) => profileResolvers.getProfileByUser(profileClient, args)
        }
      }
    });
    this.gql = expressGraphQL({
      schema: new GraphQLSchema({
        mutation: Mutation,
        query: Query
      }),
      graphiql: true
    });
  }
}
