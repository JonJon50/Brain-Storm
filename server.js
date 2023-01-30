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

app.get("/api/notes/:id", function (req, res) {
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes[Number(req.params.id)]);
});

app.post("/api/notes", function (req, res) {
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let note = req.body;
  let id = notes.length.toString();
  note.id = id;
  notes.push(note);

  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  console.log("Note saved to db.json!!");
  res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
    console.log("delete  received.");
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let id = req.params.id;
    let newId = 0;
    notes = notes.filter((currNote) => {
        return currNote.id != id;
      });
    
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}. At your service!`);
});
