import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";
import UserType from "../types/UserType";
const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, request) {
        if (request.currentUser) {
          return {
            id: request.currentUser.id,
            email: request.currentUser.email,
          };
        } else {
          return { id: null, email: null };
        }
      },
    },
  },
});
export default RootQueryType;
