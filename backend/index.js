const express = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require('./middlewares/cors');
const deviceRouter = require('./routes/devices');
const groupsRouter = require('./routes/groups');
const app = express();

mongoose.connect('mongodb://localhost:27017/smartHome3');

app.use(corsMiddleware);
app.use(express.json());
app.use('/devices', deviceRouter);
app.use('/groups', groupsRouter);

app.get('/', (req, res) => {
    res.send('I work :)');
});

app.listen(3005);