interface Summary {
  numDays: number;
  daysTrained: number;
  target: number;
  averageTime: number;
  targetReached: boolean,
  rating: number;
  ratingDescription: string;
}

interface Values {
  target: number,
  times: number[]
}

function parseValues(values: string[]): Values {
  if (!values[3]) {
    throw Error('Invalid arguments: Verify that "target" and "exerciseTimes" are defined');
  }

  const target = Number(values[2]);
  const times = values.slice(3).map(num => Number(num));
  const timesAreNums = times.every(t => !isNaN(t))

  if (!isNaN(target) && timesAreNums) {
    return {
      target,
      times
    }
  }

  if (isNaN(target)) {
    throw Error('Invalid argument: "target" must be a number');
  }

  if (!timesAreNums) {
    throw Error('Invalid argument: "target" must be a number');
  }
}

function calculateExercises(timeSpent: number[], targetTime: number): Summary {
  let summary = {
    numDays: timeSpent.length,
    daysTrained: timeSpent.filter(t => t > 0).length,
    target: targetTime,
    averageTime: 0,
    targetReached: timeSpent.every(t => t >= targetTime),
    rating: 0,
    ratingDescription: "okay",
  };

  const averageTime = timeSpent.reduce((acc, t) => acc + t, 0) / timeSpent.length;

  summary.averageTime = averageTime;

  if (averageTime < targetTime / 2) {
    summary.rating = 1;
    summary.ratingDescription = "Your performance is low";
    return summary
  }

  if (averageTime < targetTime) {
    summary.rating = 2;
    summary.ratingDescription = "Not bad";
    return summary
  }

  if (averageTime >= targetTime) {
    summary.rating = 3;
    summary.ratingDescription = "Impressive performance";
    return summary
  }
}

try {
  const { target, times } = parseValues(process.argv);
  console.log(calculateExercises(times, target));
} catch(err) {
  console.error(err.message);
}