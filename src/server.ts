import express from "express";
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/api`);
});
