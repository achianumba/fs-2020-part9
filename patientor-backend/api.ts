import express from 'express';
import { getDiagnoses } from './services/diagnoses';

const api = express.Router();

api.get('/ping', (_req, res) => {
    res.send('pong');
});

api.get('/diagnoses', (_req, res) => {
    res.json(getDiagnoses())
})

export default api;