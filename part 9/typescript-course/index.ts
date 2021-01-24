import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator, Result } from "./exerciseCalculator";


const app = express();

app.use(express.json());


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
            error: "malformatted parameters"
        });
    }
});

app.post("/exercises", (req, res) => {
    const { daily_exercises, target } = req.body; // eslint-disable-line
    try {
        if (!(daily_exercises && target)) {
            res.json({
                error: "parameters missing"
            });
        }
        const result: Result = exerciseCalculator(daily_exercises, target);
        res.json(result);
    } catch (err) {
        res.json({
            error: "Malformatted parameters"
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server ready at ${PORT}`);
});