// AuthController.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { isNullOrEmpty } = require('../../helper/utils.js');
const { comparePassword } = require('../../helper/PasswordExtension.js');
const pool = require('../../db.js');

router.post('/admin-login', async (req, res) => {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();

    if (isNullOrEmpty(username))
        return res.status(400).send({ status: false, message: 'Kullanıcı adı boş olamaz.', data: null });
    if (isNullOrEmpty(password))
        return res.status(400).send({ status: false, message: 'Kullanıcı şifresi boş olamaz.', data: null });

    try {
        const query = `select admin_id, k_adi, sifre from admin where LOWER(k_adi) = LOWER($1);`;
        const admin = await pool.query(query, [username]);

        if (admin.rowCount === 0)
            return res.status(400).send({ status: false, message: 'Kullanıcı adı veya şifre hatalı.', data: null });

        if (!await comparePassword(password, admin.rows[0].sifre)) {
            return res.status(400).send({ status: false, message: 'Kullanıcı adı veya şifre hatalı.', data: null });
        }

        const token = jwt.sign({ id: admin.rows[0].admin_id, username: admin.rows[0].k_adi, is_admin: true }, 'Token-Key', { expiresIn: '1h' });

        return res.status(201).send({ status: true, message: 'Giriş başarılı.', data: { token: token, username: admin.rows[0].k_adi } });
    } catch (err) {
        res.status(500).send({ status: false, message: `Giriş yapma sırasında bir hata oluştu. Hata: ${err}`, data: null });
    }
});

router.post('/user-login', async (req, res) => {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();

    if (isNullOrEmpty(username))
        return res.status(400).send({ status: false, message: 'Kullanıcı adı boş olamaz.', data: null });
    if (isNullOrEmpty(password))
        return res.status(400).send({ status: false, message: 'Kullanıcı şifresi boş olamaz.', data: null });

    try {
        const query = `select user_id, k_adi, sifre from kullanici where LOWER(k_adi) = LOWER($1);`;
        const user = await pool.query(query, [username]);
        console.log("user", user);
        if (user.rowCount === 0)
            return res.status(400).send({ status: false, message: 'Kullanıcı adı veya şifre hatalı.', data: null });

        if (!await comparePassword(password, user.rows[0].sifre)) {
            return res.status(400).send({ status: false, message: 'Kullanıcı adı veya şifre hatalı.', data: null });
        }

        const token = jwt.sign({ id: user.rows[0].user_id, username: user.rows[0].k_adi, is_user: true }, 'Token-Key', { expiresIn: '1h' });

        return res.status(201).send({ status: true, message: 'Giriş başarılı.', data: { token: token, username: user.rows[0].k_adi } });
    } catch (err) {
        res.status(500).send({ status: false, message: `Giriş yapma sırasında bir hata oluştu. Hata: ${err}`, data: null });
    }
});


module.exports = router;