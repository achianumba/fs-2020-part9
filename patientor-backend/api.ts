import express from 'express';
import { getDiagnoses } from './services/diagnoses';
<<<<<<< HEAD
import { getPatients, addPatient } from './services/patients';
=======
import { getPatients } from './services/patients';
>>>>>>> 0b80d9a97ad06fa173a04db9ff9b754f9b4420f8

const api = express.Router();

api.get('/ping', (_req, res) => {
    res.send('pong');
});

api.get('/diagnoses', (_req, res) => {
    res.json(getDiagnoses())
});

api.get('/patients', (_req, res) => {
    res.json(getPatients());
<<<<<<< HEAD
});

api.post('/patients', (req, res) => {
    try {
        res.json(addPatient(req.body))
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});
=======
})
>>>>>>> 0b80d9a97ad06fa173a04db9ff9b754f9b4420f8

export default api;