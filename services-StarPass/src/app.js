import express from "express";
import cors from "cors";
import gateRoutes from "./routes/gateRoutes.js";
//import queueRoutes from "./routes/queueRoutes.js";
//import userRoutes from "./routes/userRoutes.js";
//import attractionRoutes from "./routes/attractionRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/guiche", gateRoutes);
//app.use("/queue", queueRoutes);
//app.use("/user", userRoutes);
//app.use("/attraction", attractionRoutes);


export default app;
