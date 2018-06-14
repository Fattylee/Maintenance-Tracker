import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/userRoute';
import path from 'path';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( express.static(path.join(__dirname, 'UI')));
app.use('/api/v1', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server listening for request on port', port);
});


export default app;