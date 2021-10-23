import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../.env") });

export const BOT_ACCESS_TOKEN = process.env.BOT_ACCESS_TOKEN;
export const ADMIN_ACCESS_TOKEN = process.env.ADMIN_ACCESS_TOKEN;
export const ADMIN_PRODUCTION = process.env.ADMIN_PRODUCTION;
