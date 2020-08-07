interface Args {
    height: number,
    weight: number
}

function parseArgs(args: string[]) {
    const [, , h, w] = args;
    const height = parseInt(h);
    const weight = parseInt(w);

    if (!isNaN(height) && !isNaN(weight)) {
        return {
            height,
            weight
        }
    }

    if (isNaN(height) && isNaN(weight)) {
        throw TypeError(`Invalid arguments: "height" and "weight" must be numbers.`);
    }

    if (isNaN(height)) {
        throw TypeError(`Invalid argument: "height" must be a number.`);
    }

    if (isNaN(weight)) {
        throw TypeError(`Invalid argument: "weight" must be number.`);
    }
}

function calculateBmi(height: number, weight: number): string {
    const heightInMetres: number = height / 100;
    const bmi: number = weight / (heightInMetres * heightInMetres);
    
    if (bmi <= 15) {
        return 'Very severely underweight';
    }

    if (bmi <= 16) {
        return 'Severely underweight';
    }

    if (bmi <= 18.5) {
        return 'Underweight'
    }

    if (bmi <= 25) {
        return 'Normal (healthy weight)';
    }

    if (bmi <= 30) {
        return 'Overweight';
    }

    if (bmi <= 35) {
        return 'Obese Class I (Moderately obese)';
    }

    if (bmi <= 40) {
        return 'Obese Class II (Severely obese)';
    }

    if (bmi >= 40) {
        return 'Obese Class III (Very severely obese)';
    }
}

try {
    const { height, weight } = parseArgs(process.argv);
    console.log(calculateBmi(height, weight));
} catch(err) {
    console.error(err.message);
}