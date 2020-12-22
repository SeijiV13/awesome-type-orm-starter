import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import routes from './routes';
// Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(bodyParser.text());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  

    // Set all  routes from routes folder
    
    app.use('/', routes);
    const server = http.createServer(app);

    // start our server
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Server started on port ${server.address().port} :)`);
    });
  })
  .catch(error => console.log(error));
