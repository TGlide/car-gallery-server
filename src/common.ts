import { DATABASE_URL, isDevelopment, isProduction } from "./config";
import type { Pool } from "pg";
import {
  PostGraphileOptions,
  makePluginHook,
  makeExtendSchemaPlugin,
  gql,
} from "postgraphile";

const MySubscriptionPlugin = makeExtendSchemaPlugin((build) => {
  return {
    typeDefs: gql`
      type TimePayload {
        currentTimestamp: String
        query: Query
      }
      extend type Subscription {
        time: TimePayload @pgSubscription(topic: "time")
      }
    `,
    resolvers: {
      Subscription: {
        time(event) {
          return event;
        },
      },
      TimePayload: {
        query() {
          return build.$$isQuery;
        },
      },
    },
  };
});

// Connection string (or pg.Pool) for PostGraphile to use
export const database: string | Pool = `${DATABASE_URL}`;

// Database schemas to use
export const schemas: string | string[] = ["public"];

// PostGraphile options; see https://www.graphile.org/postgraphile/usage-library/#api-postgraphilepgconfig-schemaname-options
export const options: PostGraphileOptions = {
  appendPlugins: [MySubscriptionPlugin],
  pgSettings(req) {
    // Adding this to ensure that all servers pass through the request in a
    // good enough way that we can extract headers.
    // CREATE FUNCTION current_user_id() RETURNS text AS $$ SELECT current_setting('graphile.test.x-user-id', TRUE); $$ LANGUAGE sql STABLE;
    return {
      "graphile.test.x-user-id":
        req.headers["x-user-id"] ||
        // `normalizedConnectionParams` comes from websocket connections, where
        // the headers often cannot be customized by the client.
        (req as any).normalizedConnectionParams?.["x-user-id"],
    };
  },
  watchPg: isDevelopment ? true : false,
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
  exportGqlSchemaPath: `${__dirname}/schema.graphql`,
  sortExport: true,
  enableQueryBatching: true,
};

export const port: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 5000;
