import {GraphQLInputObjectType, GraphQLString} from 'graphql';

export const UserUpdateInput = new GraphQLInputObjectType({
  name: 'UserUpdateInput',
  fields: () => ({
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  })
});
