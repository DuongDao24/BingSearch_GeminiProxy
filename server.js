import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Proxy API → forward request đến Gemini Flash 2.5
app.post("/gemini", async (req, res) => {
  try {
    const apiKey = req.query.key;
    if (!apiKey) return res.status(400).json({ error: "Missing API key" });

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body)
      }
    );

    const json = await response.json();
    res.json(json);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy is running on port " + PORT));