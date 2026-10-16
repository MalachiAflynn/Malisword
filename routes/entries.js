import express from "express";

const router = express.Router();

const entries = [
  {
    title: "Plane cockpit",
    body: "A look inside the cockpit.",
    video: "/cockpit.mp4",
  },
  { title: "Second note", body: "This is the second note." },
  {
    title: "Tic Tac Toe",
    body: "Two players, same keyboard.",
    embed: "/tictactoe/",
  },
  {
    title: "Airplane note",
    body: "Look at this cool plane interior",
    image: "/airplane.jpg",
  },
];

router.get("/", (req, res) => {
  res.render("entries", { title: "My Notes", entries });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = entries[id];

  if (!entry) {
    res.status(404).render("error", { title: "Not found" });
    return;
  }

  res.render("entry", { title: entry.title, entry });
});

router.post("/", (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({ error: "title and body are required" });
    return;
  }

  const entry = { title, body };
  entries.push(entry);
  res.status(201).json(entry);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!entries[id]) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  const [deleted] = entries.splice(id, 1);
  res.json(deleted);
});

export default router;
