"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { Login, Signup, GetUser, UpdateUserName, DeleteUser } = require("./handlers.js");

const mongodb = require("mongodb");
const cors = require("cors");

// const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;

// mongoDB
//   .connect(mongoDB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("mongoDB is  connected successfully"))
//   .catch((err) => console.error(err));

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });





express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())
  // .use("/", authRoute)
  .use(cookieParser())
  .use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  )


  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above or below this line
  // ---------------------------------
  // authenticate  uuid asdf6a54sdf65s4df
  .post("/api/login", Login)
  .post("/api/signup", Signup)
  .get("/api/get-user/:id", GetUser)
  .patch("/api/update-user-name", UpdateUserName)
  .delete("/api/delete-user", DeleteUser)
  // ---------------------------------
  // Nothing to modify above or below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));

// 'use strict';

// // imports and setup
// const express = require('express');
// const morgan = require('morgan');
// const router = require('./routes/router');
// // const { client } = require('./db/dbHandler');

// const PORT = 3003;

// const server = express();

// // middlewares
// server.use(function (req, res, next) {
//   res.header(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, HEAD, GET, PUT, POST, DELETE'
//   );
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
// server.use(morgan('tiny'));
// server.use(express.static('./server/assets'));
// server.use(express.json());
// server.use(express.urlencoded({ extended: false }));
// server.use('/', express.static(__dirname + '/'));

// // routes
// server.use('/api', router);

// // connect to db and server
// const start = async () => {
//   try {
//     // await client.connect();
//     console.log("Connected to mongo");
//     server.listen(PORT, () => console.info(`Listening on port ${PORT}`));
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();

// // const express = require('express');
// // const morgan = require('morgan');
// // const path = require('path'); // Add this line
// // const router = require('./routes/router');

// // const PORT = 3003;

// // const server = express();

// // server.use(morgan('tiny'));
// // server.use(express.json());

// // // Serve static files from the React build directory
// // server.use(express.static(path.join(__dirname, 'client', 'public')));

// // // Use the router
// // server.use('/', router);

// // // Serve React app for all other routes
// // server.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, '../client', 'public', 'index.html'));
// // });

// // server.listen(PORT, () => {
// //   console.info(`Server is listening on port ${PORT}`);
// // });
