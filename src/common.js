"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.options = exports.schemas = exports.database = void 0;
var config_1 = require("./config");
var postgraphile_1 = require("postgraphile");
var MySubscriptionPlugin = postgraphile_1.makeExtendSchemaPlugin(function (build) {
    return {
        typeDefs: postgraphile_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      type TimePayload {\n        currentTimestamp: String\n        query: Query\n      }\n      extend type Subscription {\n        time: TimePayload @pgSubscription(topic: \"time\")\n      }\n    "], ["\n      type TimePayload {\n        currentTimestamp: String\n        query: Query\n      }\n      extend type Subscription {\n        time: TimePayload @pgSubscription(topic: \"time\")\n      }\n    "]))),
        resolvers: {
            Subscription: {
                time: function (event) {
                    return event;
                },
            },
            TimePayload: {
                query: function () {
                    return build.$$isQuery;
                },
            },
        },
    };
});
// Connection string (or pg.Pool) for PostGraphile to use
exports.database = "" + config_1.DATABASE_URL;
// Database schemas to use
exports.schemas = ["public"];
// PostGraphile options; see https://www.graphile.org/postgraphile/usage-library/#api-postgraphilepgconfig-schemaname-options
exports.options = {
    appendPlugins: [MySubscriptionPlugin],
    pgSettings: function (req) {
        var _a;
        // Adding this to ensure that all servers pass through the request in a
        // good enough way that we can extract headers.
        // CREATE FUNCTION current_user_id() RETURNS text AS $$ SELECT current_setting('graphile.test.x-user-id', TRUE); $$ LANGUAGE sql STABLE;
        return {
            "graphile.test.x-user-id": req.headers["x-user-id"] ||
                (
                // `normalizedConnectionParams` comes from websocket connections, where
                // the headers often cannot be customized by the client.
                (_a = req.normalizedConnectionParams) === null || _a === void 0 ? void 0 : _a["x-user-id"]),
        };
    },
    watchPg: config_1.isDevelopment ? true : false,
    graphiql: true,
    enhanceGraphiql: true,
    subscriptions: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    showErrorStack: "json",
    extendedErrors: [
        "severity",
        "code",
        "detail",
        "hint",
        "position",
        "internalPosition",
        "internalQuery",
        "where",
        "schema",
        "table",
        "column",
        "dataType",
        "constraint",
        "file",
        "line",
        "routine",
    ],
    allowExplain: true,
    legacyRelations: "omit",
    exportGqlSchemaPath: __dirname + "/schema.graphql",
    sortExport: true,
    retryOnInitFail: config_1.isProduction ? true : undefined,
    enableQueryBatching: true,
};
exports.port = process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 5000;
var templateObject_1;
