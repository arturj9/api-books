import { config } from "dotenv";

config();

const config_values = {
  jwt_key: process.env.JWT_KEY || '',
  port: process.env.PORT
};

export default config_values;
