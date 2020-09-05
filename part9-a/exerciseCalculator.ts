interface Summary {
  numDays: number;
  daysTrained: number;
  target: number;
  averageTime: number;
  targetReached: boolean;
  rating: number;
  ratingDescription: string;
}

interface Values {
  daily_exercises: number[];
  target: number;
}

interface Err {
  error: string;
  message: string;
}

function validateInput(values: Values): Values {
  const targetIsNumber: boolean = typeof values.target === "number";
  const exercisesTimesAreNumbers: boolean = values.daily_exercises.every(
    (x) => typeof x === "number"
  );

  if (!targetIsNumber || !exercisesTimesAreNumbers) {
    throw Error(
      "'target' must be a number and 'exercise_times' must be an array of numbers"
    );
  }

  return values;
}

function calculateExercises(args: any): Summary | Err {
  try {
    const { target, daily_exercises } = validateInput(args);
    let summary = {
      numDays: daily_exercises.length,
      daysTrained: daily_exercises.filter((t) => t > 0).length,
      target,
      averageTime: 0,
      targetReached: daily_exercises.every((t) => t >= target),
      rating: 0,
      ratingDescription: "",
    };

    const averageTime =
      daily_exercises.reduce((acc, t) => acc + t, 0) / daily_exercises.length;

    summary.averageTime = averageTime;

    if (averageTime >= target) {
      summary.rating = 3;
      summary.ratingDescription = "Impressive performance";
    }

    if (averageTime < target) {
      summary.rating = 2;
      summary.ratingDescription = "Not bad";
    }

    if (averageTime < target / 2) {
      summary.rating = 1;
      summary.ratingDescription = "Your performance is low";
    }

    return summary;
  } catch (err) {
    return {
      error: "parameters missing",
      message: err.message,
    };
  }
}

export default calculateExercises;