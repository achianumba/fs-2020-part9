import express from 'express';

const api = express.Router();

api.get('/ping', (_req, res) => {
    res.send('pong');
});

export default api;