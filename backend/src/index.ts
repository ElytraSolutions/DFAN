import express, { Express } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';

import './config/dotenv';
import config from './config/db';
import LoginRoute from './routes/login';
import RegisterRoute from './routes/users/register';
import LogoutRoute from './routes/logout';
import AdminsRoute from './routes/admins/index';
import UserRoute from './routes/users/index';

(async () => {
    try {
        await config();
    } catch (error) {
        console.log('Error in database configuration: ', error);
    }
})();

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'keyboard cat',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            // sameSite: 'none',
        },
        resave: false,
        saveUninitialized: true,
        rolling: true,
    }),
);
app.set('trust proxy', 1);
app.use(
    cors({
        origin: 'http://localhost:5173',
    }),
);

// use public directory to serve static files
app.use(express.static('public'));

app.post('/login', LoginRoute);
app.post('/register', RegisterRoute);
app.post('/logout', LogoutRoute);
app.use('/admins', AdminsRoute);
app.use('/users', UserRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
