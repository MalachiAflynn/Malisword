import express from "express";
import apiRouter from "./routes/api.js";

const app = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

const entries = [
  {
    title: "Plane cockpit",
    body: "A look inside the cockpit.",
    video: "/cockpit.mp4",
  },
  { title: "Second note", body: "This is the second note." },
  { title: "Tic Tac Toe", body: "Two players, same keyboard.", embed: "/tictactoe/" },
  {
    title: "Airplane note",
    body: "Look at this cool plane interior",
    image: "/airplane.jpg",
  },
];

app.get("/entries", (req, res) => {
  res.render("entries", { title: "My Notes", entries });
});

app.get("/entries/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = entries[id];

  if (!entry) {
    res.status(404).render("error", { title: "Not found" });
    return;
  }

  res.render("entry", { title: entry.title, entry });
});

const projects = [
  { name: "Weather app", tag: "javascript" },
  { name: "Portfolio site", tag: "express" },
  { name: "Budget tracker", tag: "python" },
  { name: "AbleLion", tag: "flight" },
  { name: "malachi", tag: "flynn" },
];

app.get("/", (req, res) => {
  res.send("Hello, web!");
});

app.get("/about", (req, res) => {
  res.send(
    "This is a web programming course. I am Malachi Flynn taking this course",
  );
});

app.get("/Grades", (req, res) => {
  res.send("failed classes  = 0 ");
});

app.get("/projects", (req, res) => {
  const tag = req.query.tag;

  if (!tag) {
    res.json(projects);
    return;
  }
  const matches = projects.filter((p) => p.tag === tag);
  res.json(matches);
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
