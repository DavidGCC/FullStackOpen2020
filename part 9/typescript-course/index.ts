import express from "express";
import { calculateBmi } from "./bmiCalculator";


const app = express();


app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    try {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        const bmi: string = calculateBmi(height, weight);
        res.json({
            weight,
            height,
            bmi
        });
    } catch (error) {
        res.json({
            error: "malformed parameters"
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server ready at ${PORT}`);
});