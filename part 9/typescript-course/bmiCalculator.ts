export const calculateBmi = (h: number, m: number): string => {
    let bmi: number;
    if (!(m && h)) {
        throw new Error("invalid parameters");
    }
    try {
        bmi = m / (h / 100) ** 2;
    } catch (error) {
        console.log("Something went wrong");
        throw new Error(error.message); //eslint-disable-line
    }
    if (bmi < 15) {
        return "Very severly underweight";
    } else if (bmi < 16) {
        return "Severely underweight";
    } else if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi < 30) {
        return "Overweight";
    } else if (bmi < 35) {
        return "Obese Class I (Moderately obese)";
    } else if (bmi < 40) {
        return "Obese Class II (Severely obese)";
    } else {
        return "Obese Class III (Very severely obese)";
    }
};

if (process.argv.length > 4) {
    throw new Error("Too many arguments");
} else if (process.argv.length < 2) {
    throw new Error("Not enought arguments");
}

// try {
//     console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
// } catch (error) {
//     console.log("Something went wrong", error.message);
// }
