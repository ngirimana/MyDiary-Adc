import express from 'express';
import bodyParse from 'body-parser';
import config from './config/default';
import userRoute from './routes/userRoute';


const app = express();

app.use(bodyParse.json());

app.use('/api/v1/auth', userRoute);


app.use('/', (req, res) => {
  res.status(400).send({
    status: 400,
    error: 'Incorrect route',
  });
});


const { port } = config;
app.listen(port, () => console.log(`Listening on port ${port}...`));
export default app;
