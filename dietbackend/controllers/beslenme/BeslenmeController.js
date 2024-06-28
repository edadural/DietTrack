// BeslenmeController.js

const express = require("express");
const router = express.Router();
const checkAuth = require("../../middlewares/JwtMiddleware.js");
const { isNullOrEmpty } = require("../../helper/utils.js");
const pool = require("../../db.js");
const { addHours, format, parse } = require("date-fns");

router.post("/beslenme-get", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi görüntüleyebilir.",
      data: null,
    });

  const beslenme_id = req.body?.beslenme_id;
  const user_id = req.body?.user_id;

  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Kullanıcı boş olamaz.`, data: null });

  if (!isNullOrEmpty(beslenme_id)) {
    try {
      const query = ` select 
                                id, kahvalti, ogle, aksam, atistirma, tarih, kahvalti_tik, ogle_tik, aksam_tik, atistirma_tik, k.user_id, k.ad, k.soyad
                            from beslenme
                                inner join kullanici k on k.user_id = beslenme.user_id
                            where id = $1 and beslenme.admin_id = $2`;
      const beslenme = await pool.query(query, [beslenme_id, req.auth.id]);
      return res.status(201).send({
        status: true,
        message: "Veri(ler) Listelendi.",
        data: beslenme.rows[0],
      });
    } catch (err) {
      res.status(500).send({
        status: false,
        message: `Beslenme getirme sırasında bir hata oluştu. Hata: ${err}`,
        data: null,
      });
    }
  } else {
    try {
      const query = ` select 
                                id, kahvalti, ogle, aksam, atistirma, tarih, kahvalti_tik, ogle_tik, aksam_tik, atistirma_tik, k.user_id, k.ad, k.soyad
                            from beslenme
                                inner join kullanici k on k.user_id = beslenme.user_id
                            where beslenme.admin_id = $1 and beslenme.user_id = $2 
                            order by id desc
                            limit 7;`;
      const beslenmes = await pool.query(query, [req.auth.id, user_id]);
      console.log("beslenmesbeslenmes", beslenmes);
      const today = new Date();
      let hasOldDate = false;
      console.log("beslenmes", beslenmes.rows);
      beslenmes.rows.forEach((record) => {
        const recordDate = new Date(record.tarih);
        console.log(recordDate + "" + today);
        if (
          format(new Date(recordDate), "yyyy-MM-dd 00:00:00") <
          format(new Date(today), "yyyy-MM-dd 00:00:00")
        ) {
          hasOldDate = true;
        }
      });
      console.log("hasOldDate", hasOldDate);
      if (hasOldDate) {
        beslenmes.rows = null;
      } else {
        beslenmes.rows = beslenmes.rows.map((beslenme) => {
          return {
            ...beslenme,
            tarih: format(new Date(beslenme.tarih), "yyyy-MM-dd 00:00:00"),
          };
        });
        beslenmes.rows.reverse();
      }

      return res.status(201).send({
        status: true,
        message: "Veri(ler) Listelendi.",
        data: beslenmes.rows,
      });
    } catch (err) {
      res.status(500).send({
        status: false,
        message: `Beslenme getirme sırasında bir hata oluştu. Hata: ${err}`,
        data: null,
      });
    }
  }
});

router.post("/beslenme-add", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi ekleyebilir.",
      data: null,
    });

  const beslenmeArray = req.body.beslenme;
  const user_id = req.body.user_id;

  // alanların boş olup olmadığının kontrolü
  if (beslenmeArray.lenght < 7)
    return res.status(400).send({
      status: false,
      message: `Beslenme boş olamaz veya 7 gün olmalıdır.`,
      data: null,
    });
  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Kullanıcı boş olamaz.`, data: null });

  try {
    for (let index = 0; index < beslenmeArray.length; index++) {
      const element = beslenmeArray[index];
      console.log(element.tarih);
      const tarihUTC = addHours(new Date(element.tarih), 3);

      console.log("tarihUTC", tarihUTC);

      const query = `insert into beslenme 
                                (user_id, kahvalti, ogle, aksam, atistirma, tarih, admin_id)
                                values
                                ($1, $2, $3, $4, $5, $6, $7)
                                returning id
                                `;

      const result = await pool.query(query, [
        user_id,
        element.kahvalti,
        element.ogle,
        element.aksam,
        element.atistirma,
        tarihUTC,
        req.auth.id,
      ]);
    }

    const query = ` select 
                            id, kahvalti, ogle, aksam, atistirma, tarih, kahvalti_tik, ogle_tik, aksam_tik, atistirma_tik, k.user_id, k.ad, k.soyad
                        from beslenme
                            inner join kullanici k on k.user_id = beslenme.user_id
                        where beslenme.admin_id = $1 and beslenme.user_id = $2 
                        order by id desc
                        limit 7;`;

    const beslenmes = await pool.query(query, [req.auth.id, user_id]);
    beslenmes.rows.reverse();
    return res.status(201).send({
      status: true,
      message: "Beslenme Ekleme Başarılı.",
      data: beslenmes.rows,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Beslenme ekleme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

router.post("/beslenme-update", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi güncelleyebilir.",
      data: null,
    });

  const beslenmeArray = req.body.beslenme;
  const user_id = req.body.user_id;

  if (beslenmeArray.length < 7)
    return res.status(400).send({
      status: false,
      message: `Beslenme boş olamaz veya 7 gün olmalıdır.`,
      data: null,
    });
  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Kullanıcı boş olamaz.`, data: null });

  try {
    for (let index = 0; index < beslenmeArray.length; index++) {
      const element = beslenmeArray[index];
      const query = `update beslenme 
                            set
                            kahvalti = $1,
                            ogle = $2,
                            aksam = $3,
                            atistirma = $4
                            where id = $5;`;

      await pool.query(query, [
        element.kahvalti,
        element.ogle,
        element.aksam,
        element.atistirma,
        element.beslenme_id,
      ]);
    }

    const query = ` select 
                            id, kahvalti, ogle, aksam, atistirma, tarih, kahvalti_tik, ogle_tik, aksam_tik, atistirma_tik, k.user_id, k.ad, k.soyad
                        from beslenme
                            inner join kullanici k on k.user_id = beslenme.user_id
                        where beslenme.admin_id = $1 and beslenme.user_id = $2 
                        order by id desc
                        limit 7;`;

    const beslenmes = await pool.query(query, [req.auth.id, user_id]);
    beslenmes.rows.reverse();
    return res.status(201).send({
      status: true,
      message: "Beslenme Güncelleme Başarılı.",
      data: beslenmes.rows,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Beslenme gücelleme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

// router.post('/beslenme-delete', checkAuth, async (req, res) => {
//     if (!req.auth.is_admin)
//         return res.status(403).send({ status: false, message: 'Sadece admin yetkisi silebilir.', data: null });

//     const { note_id } = req.body;

//     // alanların boş olup olmadığının kontrolü
//     if (isNullOrEmpty(note_id))
//         return res.status(400).send({ status: false, message: `Id boş olamaz.`, data: null });

//     try {
//         const note = await pool.query(`select * from notes where id = $1`, [note_id])
//         if (note.rowCount === 0) {
//             return res.status(400).send({ status: false, message: `Bu veri bulunamadı.`, data: null });
//         }

//         const query = `delete from notes where id = $1`;

//         await pool.query(query, [note_id]);

//         return res.status(201).send({ status: true, message: 'Veri Silme Başarılı.', data: note_id });
//     } catch (err) {
//         res.status(500).send({ status: false, message: `Veri silme sırasında bir hata oluştu. Hata: ${err}`, data: null });
//     }
// });

router.post("/user-beslenme-get", checkAuth, async (req, res) => {
  if (!req.auth.is_user)
    return res.status(403).send({
      status: false,
      message: "Sadece user yetkisi görüntüleyebilir.",
      data: null,
    });

  try {
    const query = ` select 
                            id, kahvalti, ogle, aksam, atistirma, tarih, kahvalti_tik, ogle_tik, aksam_tik, atistirma_tik, k.user_id, k.ad, k.soyad
                        from beslenme
                            inner join kullanici k on k.user_id = beslenme.user_id
                        where beslenme.user_id = $1
                        order by id desc
                        limit 7;`;
    const beslenmes = await pool.query(query, [req.auth.id]);

    const today = new Date();
    let hasOldDate = false;
    console.log("beslenmes", beslenmes.rows);
    beslenmes.rows.forEach((record) => {
      const recordDate = new Date(record.tarih);
      console.log(recordDate + "" + today);
      if (
        format(new Date(recordDate), "yyyy-MM-dd 00:00:00") <
        format(new Date(today), "yyyy-MM-dd 00:00:00")
      ) {
        hasOldDate = true;
      }
    });

    if (hasOldDate) {
      beslenmes.rows = null;
    } else {
      beslenmes.rows = beslenmes.rows.map((beslenme) => {
        return {
          ...beslenme,
          tarih: format(new Date(beslenme.tarih), "yyyy-MM-dd 00:00:00"),
        };
      });
      beslenmes.rows.reverse();
    }

    return res.status(201).send({
      status: true,
      message: "Veri(ler) Listelendi.",
      data: beslenmes.rows,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Beslenme getirme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

router.post("/user-beslenme-update", checkAuth, async (req, res) => {
  if (!req.auth.is_user)
    return res.status(403).send({
      status: false,
      message: "Sadece user yetkisi güncelleyebilir.",
      data: null,
    });

  const beslenmeArray = req.body.beslenme;

  if (beslenmeArray.length < 7)
    return res.status(400).send({
      status: false,
      message: `Beslenme boş olamaz veya 7 gün olmalıdır.`,
      data: null,
    });

  try {
    for (let index = 0; index < beslenmeArray.length; index++) {
      const element = beslenmeArray[index];
      const query = `update beslenme 
                            set
                            kahvalti_tik = $1,
                            ogle_tik = $2,
                            aksam_tik = $3,
                            atistirma_tik = $4
                            where id = $5;`;

      await pool.query(query, [
        element.kahvalti_tik,
        element.ogle_tik,
        element.aksam_tik,
        element.atistirma_tik,
        element.beslenme_id,
      ]);
    }

    const query = ` select 
                            id, kahvalti, ogle, aksam, atistirma, tarih, kahvalti_tik, ogle_tik, aksam_tik, atistirma_tik, k.user_id, k.ad, k.soyad
                        from beslenme
                            inner join kullanici k on k.user_id = beslenme.user_id
                        where beslenme.user_id = $1
                        order by id desc
                        limit 7;`;

    const beslenmes = await pool.query(query, [req.auth.id]);

    return res.status(201).send({
      status: true,
      message: "Beslenme Güncelleme Başarılı.",
      data: beslenmes.rows[0],
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Beslenme gücelleme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

module.exports = router;
