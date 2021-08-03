"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDevelopment = exports.FRONTEND_URL = exports.DATABASE_URL = void 0;
var path_1 = __importDefault(require("path"));
// import dotenv from "dotenv";
var dotenv = require("dotenv");
dotenv.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
exports.DATABASE_URL = process.env.DATABASE_URL || "postgraphile";
exports.FRONTEND_URL = process.env.FRONTEND_URL || "";
exports.isDevelopment = process.env.ENVIRONMENT === "development";
