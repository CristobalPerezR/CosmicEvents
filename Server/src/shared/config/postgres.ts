import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const {DB_HOST, DB_PORT, DB_USER, DB_PSW, DB_NAME } = process.env;

export const conn = new Pool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PSW,
    database: DB_NAME
});