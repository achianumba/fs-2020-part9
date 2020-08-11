interface Args {
  height: string;
  weight: string;
}

interface ParsedArgs {
  height: number;
  weight: number;
}

interface WebBmi {
  height: number;
  weight: number;
  bmi: string;
}

interface Err {
  error: string;
  message: string;
}

function parseArgs(args: Args): ParsedArgs {
  const height = parseInt(args.height);
  const weight = parseInt(args.weight);

  if (isNaN(height) && isNaN(weight)) {
    throw TypeError(`"height" and "weight" must be numbers.`);
  }

  if (isNaN(height)) {
    throw TypeError(`"height" must be a number.`);
  }

  if (isNaN(weight)) {
    throw TypeError(`"weight" must be number.`);
  }

  return {
    height,
    weight,
  };
}

function calculateBmi(args: Args): WebBmi | Err {
  try {
    const { height, weight } = parseArgs(args);
    const heightInMetres: number = height / 100;
    const bmi: number = weight / (heightInMetres * heightInMetres);

    let reslut: WebBmi = { height, weight, bmi: "" };

    if (bmi > 40) {
      reslut.bmi = "Obese Class III (Very severely obese)";
    }

    if (bmi >= 35 && bmi < 40) {
      reslut.bmi = "Obese Class II (Severely obese)";
    }

    if (bmi >= 30 && bmi < 35) {
      reslut.bmi = "Obese Class I (Moderately obese)";
    }

    if (bmi >= 25 && bmi < 30) {
      reslut.bmi = "Overweight";
    }

    if (bmi >= 18.5 && bmi < 25) {
      reslut.bmi = "Normal (healthy weight)";
    }

    if (bmi >= 16 && bmi < 18.5) {
      reslut.bmi = "Underweight";
    }

    if (bmi >= 15 && bmi < 16) {
      reslut.bmi = "Severely underweight";
    }

    if (bmi < 15) {
      reslut.bmi = "Very severely underweight";
    }

    return reslut;
  } catch (err) {
    return {
      error: "malformed parameters",
      message: err.message,
    };
  }
}

export default calculateBmi;
