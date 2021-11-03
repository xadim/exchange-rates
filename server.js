const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const ratesRouter = require("./routes/rates");
app.use("/rates", ratesRouter);
if (!module.parent) {
  app.listen(process.env.PORT || 4444, () =>
    console.log(`Exchange Rate App!`)
  );
}

module.exports = app;
