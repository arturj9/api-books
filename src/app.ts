import "express-async-errors";
import express from "express";
import cors from 'cors';

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./lib/swagger_output.json";

import { routes } from "./routes";

import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();
const port = 8080;
const hostname = "0.0.0.0";

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use("/api/v1", routes);

app.use(errorMiddleware);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
