import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";
import mutation from "./mutations/Mutation";
import RootQueryType from "./queries/Query";
import UserType from "./types/UserType";

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutation,
});
export default schema;
