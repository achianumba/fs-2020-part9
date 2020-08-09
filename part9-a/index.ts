import express from 'express';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.listen(process.env.PORT || 3001, () => {
    console.log('Express server ready')
});