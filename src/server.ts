import "dotenv/config";
import express, { json } from "express";
import userRouter from "./routers/userRouters";

const port = 3001;
const app = express();
app.use(json());
userRouter(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
