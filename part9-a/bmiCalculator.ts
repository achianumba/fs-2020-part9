/* 
underweight (under 18.5 kg/m2), normal weight (18.5 to 25), overweight (25 to 30), and obese (over 30).
 */


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

console.log(calculateBmi(180, 74))