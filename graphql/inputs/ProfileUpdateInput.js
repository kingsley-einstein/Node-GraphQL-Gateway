import {GraphQLInputObjectType, GraphQLString} from 'graphql';

export const ProfileUpdateInput = new GraphQLInputObjectType({
  name: 'ProfileUpdateInput',
  fields: () => ({
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    }
  })
});
