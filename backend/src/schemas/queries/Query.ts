import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";
import PrivateDataType from "../types/PrivateDataType";
import PublicDataType from "../types/PublicDataType";
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
    private: {
      type: PrivateDataType,
      resolve(parentValue, args, request) {
        if (request.currentUser) {
          return {
            id: "privateId1",
            type: "private",
          };
        } else {
          return { id: null, type: null };
        }
      },
    },
    public: {
      type: PublicDataType,
      resolve(parentValue, args, request) {
        return {
          id: "publicId1",
          type: "public",
        };
      },
    },
  },
});
export default RootQueryType;
