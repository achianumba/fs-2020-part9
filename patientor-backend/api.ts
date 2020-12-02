import express from "express";
import { getDiagnoses } from "./services/diagnoses";
import {
  getPatients,
  addPatient,
  getPatient,
  addEntry,
} from "./services/patients";
import { Entry } from "./interfaces";

const api = express.Router();

api.get("/ping", (_req, res) => {
  res.send("pong");
});

api.get("/diagnosis", (_req, res) => {
  res.json(getDiagnoses());
});

api.get("/patients", (_req, res) => {
  res.json(getPatients());
});

api.post("/patients", (req, res) => {
  try {
    res.json(addPatient(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

api.get("/patients/:id", (req, res) => {
  try {
    res.json(getPatient(req.params.id));
  } catch (err) {
    res.status(400).json(err.message);
  }
});

api.post("/patients/:id/entries", (req, res) => {
  try {
    const newEntry: Entry = addEntry(req.body);
    res.json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export default api;
