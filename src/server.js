require("dotenv").config();
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import logger from "morgan";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async (ctx) => {
      if (ctx.req) {
        return {
          loggedInUser: await getUser(ctx.req.headers.token),
        };
      } else {
        const {
          connection: { context },
        } = ctx;
        return {
          loggedInUser: context.loggedInUser,
        };
      }
    },
    subscriptions: {
      onConnect: async ({ token }) => {
        console.log(token);
        if (!token) {
          throw new Error("You can't listen.");
        }
        const loggedInUser = await getUser(token);
        return {
          loggedInUser,
        };
      },
    },
  });

  await apollo.start();
  apollo.applyMiddleware({ app });
  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));

  httpServer.listen(PORT, () => {
    console.log(
      `🚀Server is running on http://localhost:${PORT} ✅
  👾Graphql: http://localhost:${PORT}${apollo.graphqlPath}`
    );
  });
  // httpServer.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  //   console.log(`
  //   🚀  Server is ready at ${url}
  //   📭  Query at https://studio.apollographql.com/dev
  // `);
  // });
}

startServer();
