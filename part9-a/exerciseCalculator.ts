interface Summary {
  numDays: number;
  daysTrained: number;
  target: number;
  averageTime: number;
  targetReached: boolean,
  rating: number;
  ratingDescription: string;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
