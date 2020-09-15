import express from 'express';
import api from './api';
const cors: any = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', api);

app.listen(process.env.PORT || 3001, () => {
    console.log('Server running');
});