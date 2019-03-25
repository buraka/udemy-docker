const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Vote = require("./vote");

const API_PORT = 3000;
const app = express();
const router = express.Router();

const dbRoute = "mongodb://mongoadmin:secret@mongo-db/admin";

mongoose.connect(
  dbRoute,
  {server:{auto_reconnect:true}}
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

db.on("error", () => {
  console.log("MongoDB connection error:")
  mongoose.connect(dbRoute, {server:{auto_reconnect:true}});
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
router.get("/getVote", (req, res) => {
  Vote.count({ vote: 'iOS'}, (err, iOScount) => {
    if (err) return res.json({ success: false, error: err });
    Vote.count({ vote: 'Android'}, (e, androidCount) => {
      if (e) return res.json({ success: false, error: err });

      const total = (iOScount + androidCount) / 100;
      const iOSPercentage = (iOScount / total).toFixed(2);
      const androidPercentage = (androidCount / total).toFixed(2);

      return res.json({ success: true, ios: iOSPercentage, android: androidPercentage });

    })
  });

});

router.post("/vote", (req, res) => {
  db.once('open', function () {
   log.info('Connected to database');
});
  const { vote } = req.body;
  Vote.create({ vote }, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT);
