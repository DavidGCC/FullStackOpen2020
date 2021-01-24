export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}

export const exerciseCalculator = (hours: Array<number>, target: number): Result => {
    const average: number = hours.reduce((avg, current, _, { length }) => avg + current / length, 0);
    const trainingDays: number = hours.filter(hour => hour > 0).length;
    const success: boolean = average >= target ? true : false;
    const periodLength: number = hours.length;
    let ratingDescription: string;
    let rating: 1 | 2 | 3;
    if (trainingDays >= periodLength - 1) {
        ratingDescription = "Excellent, keep up the good work";
        rating = 3;
    } else if (trainingDays > periodLength - 4) {
        ratingDescription = "Not bad but could be better, keep working";
        rating = 2;
    } else {
        ratingDescription = "I'm sure you can do much better";
        rating = 1;
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// if (process.argv.length < 4) {
//     throw new Error("Not enough arguments");
// }

// try {
//     const hours = process.argv.slice(3).map(hour => Number(hour));
//     console.log(exerciseCalculator(hours, Number(process.argv[2])));
// } catch (error) {
//     console.log("Something happened", error.message); //eslint-disable-line
// }