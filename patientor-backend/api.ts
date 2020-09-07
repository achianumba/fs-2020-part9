import express from 'express';
import { getDiagnoses } from './services/diagnoses';
import { getPatients } from './services/patients';

const api = express.Router();

api.get('/ping', (_req, res) => {
    res.send('pong');
});

api.get('/diagnoses', (_req, res) => {
    res.json(getDiagnoses())
});

api.get('/patients', (_req, res) => {
    res.json(getPatients());
})

export default api;