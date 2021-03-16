import express from "express";
import cors from "cors";
require("express-async-errors");
import { json } from "body-parser";

import cookieSesion from "cookie-session";

import { handleError } from "@jinyongnan810/ticketing-common";
import { NotFoundError } from "@jinyongnan810/ticketing-common";
import { graphqlHTTP } from "express-graphql";
import schema from "./schemas/schema";

const app = express();

app.set("trust proxy", true); //trust ingress nginx
app.use(cors());
app.use(json());
app.use(
  cookieSesion({
    signed: false, // no encryption
    secure: process.env.NODE_ENV !== "test", // only https
  })
);
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(handleError);

export { app };
