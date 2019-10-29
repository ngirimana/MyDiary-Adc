import express from 'express';
import bodyParse from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import config from './config/default';
import userRoute from './routes/userRoute';
import entryRoute from './routes/entryRoute';
import swaggerDocument from '../app.json';

const app = express();

app.use(bodyParse.json());

app.use('/api/v1/auth', userRoute);
app.use('/api/v1', entryRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', (req, res) => {
  res.status(400).send({
    status: 400,
    error: 'Incorrect route',
  });
});


const { port } = config;
app.listen(port, () => console.log(`Listening on port ${port}...`));
export default app;
