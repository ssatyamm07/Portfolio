require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/connection');
const router = require('./routes/router');
const port = process.env.PORT 

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
