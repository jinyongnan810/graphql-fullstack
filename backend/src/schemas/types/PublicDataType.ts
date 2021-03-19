import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
const PublicDataType = new GraphQLObjectType({
  name: "PublicDataType",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
  }),
});
export default PublicDataType;
