import express from "express";
import diagnoseRouter from "./routes/diagnoses";
import cors from "cors";

const app = express();

app.use(cors()); //eslint-disable-line
app.use(express.json());


app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server ready at ${PORT}`);
});