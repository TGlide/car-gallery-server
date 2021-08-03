import path from "path";

// import dotenv from "dotenv";
const dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export const DATABASE_URL = process.env.DATABASE_URL || "postgraphile";
export const FRONTEND_URL = process.env.FRONTEND_URL || "";
