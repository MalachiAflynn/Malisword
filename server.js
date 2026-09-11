import express from "express";
import apiRouter from "./routes/api.js";

const app = express();

const PORT = 3000;

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
