import express from 'express';
import bodyParse from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import config from './config/default';
import userRoute from './routes/userRoute';
import swaggerDocument from '../app.json';

const app = express();

app.use(bodyParse.json());

app.use('/api/v2/auth', userRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome To My Diary',
  });
});


const { port } = config;
app.listen(port, () => console.log(`Listening on port ${port}...`));
export default app;
