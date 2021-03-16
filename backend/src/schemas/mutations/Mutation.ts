import { BadRequestError } from "@jinyongnan810/ticketing-common";
import { Request } from "express";
const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
import jwt from "jsonwebtoken";
import { User } from "../../models/user";
import UserType from "../types/UserType";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(
        parentValue: any,
        args: { email: string; password: string },
        request: Request
      ) {
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new BadRequestError("Email in use.");
        } else {
          // create user
          const newUser = User.build({
            email: args.email,
            password: args.password,
          });
          await newUser.save();
          const userJwt = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_KEY! //ignore typescript error
          );
          request.session = {
            jwt: userJwt,
          };
          return { id: newUser.id, email: newUser.email };
        }
      },
    },
  },
});

export default mutation;
