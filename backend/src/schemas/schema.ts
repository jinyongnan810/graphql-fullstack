import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";
import mutation from "./mutations/Mutation";
import UserType from "./types/UserType";

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return {
          id: Math.floor(Math.random() * 1000).toString(),
          email: "test@test.com",
        };
      },
    },
  },
});
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutation,
});
export default schema;
