const restify = require("restify");
const morgan = require("morgan");
const corsMidlleware = require("restify-cors-middleware");
const databaseConnection = require("./models/Database");

// Connect to Database
databaseConnection.connect((err, db) => {
  if (err != null) {
    process.exit();
  } else {
    console.log("[DATABASE] Has Been Connected!");
    // Create Server
    const server = restify.createServer();
    // Body Parser Middleware
    server.use(restify.plugins.queryParser()); // parse query data from url
    server.use(restify.plugins.bodyParser({ mapParams: false })); // parsing data from form input

    // CORS Middleware
    const cors = corsMidlleware({
      origins: ["*"],
      allowHeaders: ["Authorization"]
    });
    server.pre(cors.preflight);
    server.use(cors.actual);

    // Morgan Middleware
    server.use(morgan("dev"));

    // Route
    require("./routes/Route")(server);

    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log("[SERVER] Running on Port !" + port);
    });
  }
});
