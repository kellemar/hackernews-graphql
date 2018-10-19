const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')

const { Prisma } = require('prisma-binding')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
      ...req,
      db: new Prisma({
        typeDefs: 'src/generated/prisma.graphql',
        endpoint: 'https://us1.prisma.sh/alvin-de-cruz-afc52a/database/dev',
        secret: 'mysecret123',
        debug: true,
      }),
    }),
  })
server.start(() => console.log(`Server is running on http://localhost:4000`))