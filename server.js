import express from "express";
import apiRouter from "./routes/api.js";
import entriesRouter from "./routes/entries.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/entries", entriesRouter);

const projects = [
  { name: "Weather app", tag: "javascript" },
  { name: "Portfolio site", tag: "express" },
  { name: "Budget tracker", tag: "python" },
  { name: "AbleLion", tag: "flight" },
  { name: "malachi", tag: "flynn" },
];

const wishlist = [];

app.post("/wishlist", (req, res) => {
  const { item, note } = req.body;

  if (!item || !note) {
    res.status(400).json({ error: "item and note are required" });
    return;
  }

  const newItem = { item, note };
  wishlist.push(newItem);
  res.status(201).json(newItem);
});

app.get("/", (req, res) => {
  res.send("Hello, web!");
});

app.get("/about", (req, res) => {
  res.render("about");
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

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
// work in progress
