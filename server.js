const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3001;
const pubDir = path.join(__dirname, "/public");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// get route /notes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(pubDir, "notes.html"));
  });

  app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });

  

app.listen(port, function () {
    console.log(`Server listening on port ${port}. At your service!`);
  });