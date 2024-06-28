// UserController.js

const express = require("express");
const router = express.Router();
const pool = require("../../db.js");
const checkAuth = require("../../middlewares/JwtMiddleware.js");
const { hashPassword } = require("../../helper/PasswordExtension.js");
const { isNullOrEmpty } = require("../../helper/utils.js");

router.post("/user-get", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi görüntüleyebilir.",
      data: null,
    });

  const user_id = req.body?.user_id;
  if (!isNullOrEmpty(user_id)) {
    try {
      const query = `select user_id, k_adi, ad, soyad, e_posta, telf, giris_tarih, admin_id, heigth from kullanici where user_id = $1 and admin_id = $2;`;
      const user = await pool.query(query, [user_id, req.auth.id]);
      return res.status(201).send({
        status: true,
        message: "Veri(ler) Listelendi.",
        data: user.rows[0],
      });
    } catch (err) {
      res.status(500).send({
        status: false,
        message: `Kullanıcı getirme sırasında bir hata oluştu. Hata: ${err}`,
        data: null,
      });
    }
  } else {
    try {
      const query = `select user_id, k_adi, ad, soyad, e_posta, telf, giris_tarih, admin_id, heigth from kullanici where admin_id = $1;`;
      const users = await pool.query(query, [req.auth.id]);
      return res.status(201).send({
        status: true,
        message: "Veri(ler) Listelendi.",
        data: users.rows,
      });
    } catch (err) {
      res.status(500).send({
        status: false,
        message: `Kullanıcı getirme sırasında bir hata oluştu. Hata: ${err}`,
        data: null,
      });
    }
  }
});

router.post("/user-add", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi ekleyebilir.",
      data: null,
    });

  const { username, name, surname, password, mail, phone, heigth } = req.body;

  // alanların boş olup olmadığının kontrolü
  if (isNullOrEmpty(username))
    return res.status(400).send({
      status: false,
      message: `Kullanıcı adı boş olamaz.`,
      data: null,
    });
  if (isNullOrEmpty(password))
    return res
      .status(400)
      .send({ status: false, message: `Şifre boş olamaz.`, data: null });

  const hashedPassword = await hashPassword(password);

  try {
    const isUnique = await pool.query(
      `select * from kullanici where LOWER(k_adi) = LOWER($1)`,
      [username?.trim()]
    );
    if (isUnique.rowCount !== 0) {
      return res.status(400).send({
        status: false,
        message: `Bu kullanıcı adı daha önce kullanılmıştır.`,
        data: null,
      });
    }
    console.log("we", heigth);
    const query = `insert into kullanici 
                        (k_adi, ad, soyad, sifre, e_posta, telf, admin_id, heigth)
                        values
                        ($1, $2, $3, $4, $5, $6, $7, $8)
                        returning user_id
                        `;

    const result = await pool.query(query, [
      username?.trim(),
      name?.trim(),
      surname?.trim(),
      hashedPassword,
      mail?.trim(),
      phone?.trim(),
      req.auth.id,
      heigth,
    ]);
    const newUserID = result.rows[0].user_id;
console.log(newUserID);
    const response = {
      user_id: newUserID,
      username,
      name,
      surname,
      mail,
      phone,
      heigth,
      giris_tarih: new Date(),
    };

    return res.status(201).send({
      status: true,
      message: "Kullanıcı Ekleme Başarılı.",
      data: response,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Kullanıcı ekleme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

router.post("/user-update", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi güncelleyebilir.",
      data: null,
    });

  const { user_id, username, name, surname, mail, phone, heigth } = req.body;

  // alanların boş olup olmadığının kontrolü
  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Id boş olamaz.`, data: null });
  if (isNullOrEmpty(username))
    return res.status(400).send({
      status: false,
      message: `Kullanıcı adı boş olamaz.`,
      data: null,
    });

  try {
    const user = await pool.query(
      `select * from kullanici where user_id = $1`,
      [user_id]
    );
    if (user.rowCount === 0) {
      return res.status(400).send({
        status: false,
        message: `Bu kullanıcı bulunamadı.`,
        data: null,
      });
    }

    const isUnique = await pool.query(
      `select * from kullanici where LOWER(k_adi) = LOWER($1) and user_id <> $2`,
      [username?.trim(), user_id]
    );
    if (isUnique.rowCount !== 0) {
      return res.status(400).send({
        status: false,
        message: `Bu kullanıcı adı daha önce kullanılmıştır.`,
        data: null,
      });
    }

    const query = `update kullanici 
                        set
                        k_adi = $1,
                        ad = $2,
                        soyad = $3,
                        e_posta = $4,
                        telf = $5,
                        heigth = $6
                        where user_id = $7
                        `;

    await pool.query(query, [
      username?.trim(),
      name?.trim(),
      surname?.trim(),
      mail?.trim(),
      phone?.trim(),
      heigth,
      user_id,
    ]);

    const response = {
      user_id,
      username,
      name,
      surname,
      mail,
      phone,
      heigth,
      giris_tarih: user.rows[0].giris_tarih,
    };
    console.log(response);
    return res.status(201).send({
      status: true,
      message: "Kullanıcı Güncelleme Başarılı.",
      data: response,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Kullanıcı gücelleme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

router.post("/user-password-update", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi güncelleyebilir.",
      data: null,
    });

  const { user_id, password } = req.body;

  // alanların boş olup olmadığının kontrolü
  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Id boş olamaz.`, data: null });
  if (isNullOrEmpty(password))
    return res
      .status(400)
      .send({ status: false, message: `Şifre boş olamaz.`, data: null });

  try {
    const user = await pool.query(
      `select * from kullanici where user_id = $1`,
      [user_id]
    );
    if (user.rowCount === 0) {
      return res.status(400).send({
        status: false,
        message: `Bu kullanıcı bulunamadı.`,
        data: null,
      });
    }

    const hashedPassword = await hashPassword(password);

    const query = `update kullanici 
                        set
                        sifre = $1
                        where user_id = $2
                        `;

    await pool.query(query, [hashedPassword, user_id]);

    return res.status(201).send({
      status: true,
      message: "Kullanıcı Şifre Güncelleme Başarılı.",
      data: null,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Kullanıcı gücelleme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

router.post("/user-delete", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi silebilir.",
      data: null,
    });

  const { user_id } = req.body;

  // alanların boş olup olmadığının kontrolü
  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Id boş olamaz.`, data: null });

  try {
    const user = await pool.query(
      `select * from kullanici where user_id = $1`,
      [user_id]
    );
    if (user.rowCount === 0) {
      return res.status(400).send({
        status: false,
        message: `Bu kullanıcı bulunamadı.`,
        data: null,
      });
    }

    const query = `delete from kullanici where user_id = $1`;

    await pool.query(query, [user_id]);

    return res.status(201).send({
      status: true,
      message: "Kullanıcı Silme Başarılı.",
      data: user_id,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Kullanıcı silme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

module.exports = router;
