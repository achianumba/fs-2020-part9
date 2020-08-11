import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = String(req.query.height);
    const weight = String(req.query.weight);

    const payload = calculateBmi({ height, weight});

    if (!Object.keys(payload).includes('error')) {
        res.json(payload);
        return;
    }

    res.status(400).json(payload);
});

app.listen(process.env.PORT || 3001, () => {
    console.log('Express server ready')
});