// NoteController.js

const express = require("express");
const router = express.Router();
const checkAuth = require("../../middlewares/JwtMiddleware.js");
const { isNullOrEmpty } = require("../../helper/utils.js");
const pool = require("../../db.js");
const { addHours } = require("date-fns");

router.post("/note-get", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res
      .status(403)
      .send({
        status: false,
        message: "Sadece admin yetkisi görüntüleyebilir.",
        data: null,
      });

  const note_id = req.body?.note_id;
  if (!isNullOrEmpty(note_id)) {
    try {
      const query = ` select 
                                id, tarih, note, k.user_id, k.ad, k.soyad
                            from notes
                                inner join kullanici k on k.user_id = notes.user_id
                            where id = $1 and notes.admin_id = $2;`;
      const randevu = await pool.query(query, [note_id, req.auth.id]);
      return res
        .status(201)
        .send({
          status: true,
          message: "Veri(ler) Listelendi.",
          data: randevu.rows[0],
        });
    } catch (err) {
      res
        .status(500)
        .send({
          status: false,
          message: `Not getirme sırasında bir hata oluştu. Hata: ${err}`,
          data: null,
        });
    }
  } else {
    try {
      const query = ` select 
                                id, tarih, note, k.user_id, k.ad, k.soyad
                            from notes
                                inner join kullanici k on k.user_id = notes.user_id
                            where notes.admin_id = $1
                            order  by id desc;`;
      const users = await pool.query(query, [req.auth.id]);
      return res
        .status(201)
        .send({
          status: true,
          message: "Veri(ler) Listelendi.",
          data: users.rows,
        });
    } catch (err) {
      res
        .status(500)
        .send({
          status: false,
          message: `Not getirme sırasında bir hata oluştu. Hata: ${err}`,
          data: null,
        });
    }
  }
});

router.post("/note-add", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res
      .status(403)
      .send({
        status: false,
        message: "Sadece admin yetkisi ekleyebilir.",
        data: null,
      });

  const { user_id, tarih, note } = req.body;

  // alanların boş olup olmadığının kontrolü
  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Kullanıcı boş olamaz.`, data: null });
  if (isNullOrEmpty(tarih))
    return res
      .status(400)
      .send({ status: false, message: `Tarih boş olamaz.`, data: null });
  if (isNullOrEmpty(note))
    return res
      .status(400)
      .send({ status: false, message: `Not boş olamaz.`, data: null });

  const tarihUTC = addHours(new Date(tarih), 3);

  try {
    const query = `insert into notes 
                            (user_id, tarih, note, admin_id)
                            values
                            ($1, $2, $3, $4)
                            returning id
                            `;

    const result = await pool.query(query, [
      user_id,
      tarihUTC,
      note,
      req.auth.id,
    ]);
    const newNoteID = result.rows[0].id;

    const query2 = `
                        select 
                            id, tarih, note, k.user_id, k.ad, k.soyad
                        from notes
                            inner join kullanici k on k.user_id = notes.user_id
                        where
                            id = $1`;

    const response = await pool.query(query2, [newNoteID]);

    return res
      .status(201)
      .send({
        status: true,
        message: "Not Ekleme Başarılı.",
        data: response.rows[0],
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: `Not ekleme sırasında bir hata oluştu. Hata: ${err}`,
        data: null,
      });
  }
});

router.post("/note-update", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res
      .status(403)
      .send({
        status: false,
        message: "Sadece admin yetkisi güncelleyebilir.",
        data: null,
      });

  const { note_id, user_id, tarih, note } = req.body;

  if (isNullOrEmpty(note_id))
    return res
      .status(400)
      .send({ status: false, message: `Id boş olamaz.`, data: null });
  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Kullanıcı boş olamaz.`, data: null });
  if (isNullOrEmpty(tarih))
    return res
      .status(400)
      .send({ status: false, message: `Tarih boş olamaz.`, data: null });
  if (isNullOrEmpty(note))
    return res
      .status(400)
      .send({ status: false, message: `Not boş olamaz.`, data: null });

  const tarihUTC = addHours(new Date(tarih), 3);

  try {
    const query = `update notes 
                        set
                        tarih = $1,
                        user_id = $2,
                        note = $3
                        where id = $4
                        `;

    await pool.query(query, [tarihUTC, user_id, note, note_id]);

    const query2 = `
                        select 
                            id, tarih, note, k.user_id, k.ad, k.soyad
                        from notes
                            inner join kullanici k on k.user_id = notes.user_id
                        where
                            id = $1`;

    const response = await pool.query(query2, [note_id]);

    return res
      .status(201)
      .send({
        status: true,
        message: "Not Güncelleme Başarılı.",
        data: response.rows[0],
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: `Not gücelleme sırasında bir hata oluştu. Hata: ${err}`,
        data: null,
      });
  }
});

router.post("/note-delete", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res
      .status(403)
      .send({
        status: false,
        message: "Sadece admin yetkisi silebilir.",
        data: null,
      });

  const { note_id } = req.body;

  // alanların boş olup olmadığının kontrolü
  if (isNullOrEmpty(note_id))
    return res
      .status(400)
      .send({ status: false, message: `Id boş olamaz.`, data: null });

  try {
    const note = await pool.query(`select * from notes where id = $1`, [
      note_id,
    ]);
    if (note.rowCount === 0) {
      return res
        .status(400)
        .send({ status: false, message: `Bu veri bulunamadı.`, data: null });
    }

    const query = `delete from notes where id = $1`;

    await pool.query(query, [note_id]);

    return res
      .status(201)
      .send({ status: true, message: "Not Silme Başarılı.", data: note_id });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: `Not silme sırasında bir hata oluştu. Hata: ${err}`,
        data: null,
      });
  }
});

module.exports = router;
