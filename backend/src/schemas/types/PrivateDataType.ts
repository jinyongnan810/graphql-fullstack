import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
const PrivateDataType = new GraphQLObjectType({
  name: "PrivateDataType",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
  }),
});
export default PrivateDataType;
