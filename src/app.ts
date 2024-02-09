import 'express-async-errors';
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerOutput from "./lib/swagger_output.json";

import { routes } from './routes';

import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use('/api/v1', routes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});