import express from 'express';
import cors from 'cors';
import movies from './api/movie.route.js';

const app = express();
app.use(cors());
app.use(express.json())

app.use('/movies', movies);

app.use('*', (req, res) => {
    res.status(404).json({ error: "Requested route does not exist." })
})

export default app;