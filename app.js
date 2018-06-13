import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/userRoute';
import webpages from './server/routes/pagesRoute';
import path from 'path';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next)=>{
  res.append('Access-Control-Allow-Origin', ['*']);
  next();
});

app.use(express.static(path.resolve(__dirname, './ui/')));
app.use('/', webpages);
app.use('/api/v1', router);
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server listening for request on port', port);
});


export default app;