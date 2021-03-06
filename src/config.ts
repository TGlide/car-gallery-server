import path from "path";

// import dotenv from "dotenv";
const dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export const DATABASE_URL = process.env.DATABASE_URL || "postgraphile";
console.log("DEBUG DB URL", DATABASE_URL);

export const FRONTEND_URL = process.env.FRONTEND_URL || "";
export const isDevelopment = process.env.ENVIRONMENT === "development";
export const isProduction = process.env.ENVIRONMENT === "production";
