const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:4200"],
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.get("/api/search", async (req, res) => {
  const { query, top, skip } = req.query;
  const page = skip ? Math.floor(skip / top) + 1 : 1;
  const per_page = top ? Number(top) : 10;

  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query: query,
        client_id: UNSPLASH_ACCESS_KEY,
        page: page,
        per_page: per_page,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from Unsplash API" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
