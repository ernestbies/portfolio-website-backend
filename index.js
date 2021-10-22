import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import morgan from 'morgan';
import mongoose from 'mongoose';
import postRoutes from './routes/post';
import contactRoutes from './routes/contact';

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
    next();
});

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Connect with database established');
    }
});

app.use('/api', contactRoutes);
app.use('/api', postRoutes);
app.listen(config.port, () => {
    console.log('Server listening on port ' + config.port);
})
