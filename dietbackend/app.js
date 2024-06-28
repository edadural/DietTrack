const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("./db");
const initialMiddleware = require("./middlewares/InitialMiddleware")

// Cors configuration
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cors(corsOptions));

const port = 5001;

pool.connect()
    .then(() => {
        console.log('Veritabanı bağlantısı kuruldu.');

        initialMiddleware.createTables();

        app.listen(port, () => {
            console.log(`Sunucu ${port} portunda çalışıyor.`);
        });
    })
    .catch(err => {
        console.error('Veritabanı bağlantısı kurulurken hata oluştu:', err);
    });


/**
 * Import api's controllers
 */
const AuthController = require('./controllers/auth/AuthController');
app.use('/api/auth', AuthController);

const UserController = require('./controllers/user/UserController');
app.use('/api/user', UserController);

const RandevuController = require('./controllers/randevu/RandevuController');
app.use('/api/randevu', RandevuController);

const HomeController = require('./controllers/home/HomeController');
app.use('/api/home', HomeController);

const NoteController = require('./controllers/note/NoteController');
app.use('/api/note', NoteController);

const BeslenmeController = require('./controllers/beslenme/BeslenmeController');
app.use('/api/beslenme', BeslenmeController);