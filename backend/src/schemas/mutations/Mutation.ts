import { BadRequestError } from "@jinyongnan810/ticketing-common";
import { Request } from "express";
const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
import jwt from "jsonwebtoken";
import { User } from "../../models/user";
import { Password } from "../../services/password";
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
    signin: {
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
        const userFound = await User.findOne({ email: args.email });
        if (userFound) {
          if (await Password.compareHash(args.password, userFound.password)) {
            // success
            const userJwt = jwt.sign(
              { id: userFound._id, email: userFound.email },
              process.env.JWT_KEY! //ignore typescript error
            );
            request.session = {
              jwt: userJwt,
            };
          } else {
            throw new BadRequestError("Authentication failed");
          }
        } else {
          throw new BadRequestError("Authentication failed");
        }
      },
    },
    signout: {
      type: UserType,
      async resolve(parentValue: any, args: any, request: Request) {
        request.session = null;
        return {};
      },
    },
  },
});

export default mutation;
