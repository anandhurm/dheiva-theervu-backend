import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Dheiva Theervu Backend Running 🚀"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
