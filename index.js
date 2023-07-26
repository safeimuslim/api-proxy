var express = require("express"),
  request = require("request"),
  app = express();
require("dotenv").config();

app.all("*", function (req, res, next) {
  // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    req.header("access-control-request-headers")
  );

  if (req.method === "OPTIONS") {
    // CORS Preflight
    res.send();
  } else {
    request(
      {
        url: `${process.env.API_URL}${req.url}`,
        method: req.method,
        json: req.body,
        headers: { Authorization: req.header("Authorization") },
      },
      function (error, response, body) {
        if (error) {
          console.error("error: " + response.statusCode);
        }
      }
    ).pipe(res);
  }
});

app.set("port", process.env.PORT || 50000);

app.listen(app.get("port"), function () {
  console.log("Proxy server listening on port " + app.get("port"));
});
