"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var postgraphile_1 = require("postgraphile");
var common_1 = require("./common");
var config_1 = require("./config");
var middleware = postgraphile_1.postgraphile(common_1.database, common_1.schemas, common_1.options);
var fastify = fastify_1.default({ logger: true });
fastify.register(require("fastify-cors"), {
    allowedHeaders: ["Content-Type"],
});
/**
 * Converts a PostGraphile route handler into a Fastify request handler.
 */
var convertHandler = function (handler) {
    return function (request, reply) {
        return handler(new postgraphile_1.PostGraphileResponseFastify3(request, reply));
    };
};
// IMPORTANT: do **NOT** change these routes here; if you want to change the
// routes, do so in PostGraphile options. If you change the routes here only
// then GraphiQL won't know where to find the GraphQL endpoint and the GraphQL
// endpoint won't know where to indicate the EventStream for watch mode is.
// (There may be other problems too.)
// OPTIONS requests, for CORS/etc
fastify.options(middleware.graphqlRoute, convertHandler(middleware.graphqlRouteHandler));
// This is the main middleware
fastify.post(middleware.graphqlRoute, convertHandler(middleware.graphqlRouteHandler));
// GraphiQL, if you need it
if (middleware.options.graphiql) {
    if (middleware.graphiqlRouteHandler) {
        fastify.head(middleware.graphiqlRoute, convertHandler(middleware.graphiqlRouteHandler));
        fastify.get(middleware.graphiqlRoute, convertHandler(middleware.graphiqlRouteHandler));
    }
    // Remove this if you don't want the PostGraphile logo as your favicon!
    if (middleware.faviconRouteHandler) {
        fastify.get("/favicon.ico", convertHandler(middleware.faviconRouteHandler));
    }
}
// If you need watch mode, this is the route served by the
// X-GraphQL-Event-Stream header; see:
// https://github.com/graphql/graphql-over-http/issues/48
if (middleware.options.watchPg) {
    if (middleware.eventStreamRouteHandler) {
        fastify.options(middleware.eventStreamRoute, convertHandler(middleware.eventStreamRouteHandler));
        fastify.get(middleware.eventStreamRoute, convertHandler(middleware.eventStreamRouteHandler));
    }
}
fastify.listen({ port: common_1.port, host: config_1.isDevelopment ? "127.0.0.1" : "0.0.0.0" }, function (err, address) {
    if (err) {
        fastify.log.error(String(err));
        process.exit(1);
    }
    fastify.log.info("PostGraphiQL available at " + address + middleware.graphiqlRoute + " \uD83D\uDE80");
});
