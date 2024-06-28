// RandevuController.js

const express = require("express");
const router = express.Router();
const checkAuth = require("../../middlewares/JwtMiddleware.js");
const { isNullOrEmpty } = require("../../helper/utils.js");
const pool = require("../../db.js");
const { addHours, format } = require("date-fns");

router.post("/randevu-get", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi görüntüleyebilir.",
      data: null,
    });

  const randevu_id = req.body?.randevu_id;
  if (!isNullOrEmpty(randevu_id)) {
    try {
      const query = `select id, basl_tarih, bitis_tarih, baslik, user_id, admin_id from randevu where id = $1 and admin_id = $2;`;
      const randevu = await pool.query(query, [randevu_id, req.auth.id]);
      return res.status(201).send({
        status: true,
        message: "Veri(ler) Listelendi.",
        data: randevu.rows[0],
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
      const query = `select id, basl_tarih, bitis_tarih, baslik, k.user_id, k.ad, k.soyad, randevu.admin_id 
                                from randevu 
                                    inner join kullanici k on k.user_id = randevu.user_id
                                where randevu.admin_id = $1;`;
      const randevus = await pool.query(query, [req.auth.id]);
      randevus.rows = randevus.rows.map((randevu) => {
        return {
          ...randevu,
          basl_tarih: format(
            new Date(addHours(randevu.basl_tarih, -3)),
            "yyyy-MM-dd HH:mm:ss"
          ),
          bitis_tarih: format(
            new Date(addHours(randevu.bitis_tarih, -3)),
            "yyyy-MM-dd HH:mm:ss"
          ),
        };
      });
      return res.status(201).send({
        status: true,
        message: "Veri(ler) Listelendi.",
        data: randevus.rows,
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

router.post("/randevu-add", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi ekleyebilir.",
      data: null,
    });

  const { baslik, basl_tarih, bitis_tarih, user_id } = req.body;

  // alanların boş olup olmadığının kontrolü
  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Kullanıcı boş olamaz.`, data: null });
  if (isNullOrEmpty(baslik))
    return res
      .status(400)
      .send({ status: false, message: `Başlık boş olamaz.`, data: null });
  if (isNullOrEmpty(basl_tarih))
    return res.status(400).send({
      status: false,
      message: `Başlangıç tarihi boş olamaz.`,
      data: null,
    });
  if (isNullOrEmpty(bitis_tarih))
    return res
      .status(400)
      .send({ status: false, message: `Bitiş tarihi boş olamaz.`, data: null });

  const baslTarihUTC = addHours(new Date(basl_tarih), 3);
  const bitisTarihUTC = addHours(new Date(bitis_tarih), 3);

  try {
    const query = `insert into randevu 
                        (basl_tarih, bitis_tarih, baslik, user_id, admin_id)
                        values
                        ($1, $2, $3, $4, $5)
                        returning id
                        `;

    const result = await pool.query(query, [
      baslTarihUTC,
      bitisTarihUTC,
      baslik,
      user_id,
      req.auth.id,
    ]);
    const newRandevuID = result.rows[0].id;

    const query2 = `
                        select 
                            id, baslik, basl_tarih, bitis_tarih, k.user_id, k.ad, k.soyad
                        from randevu
                            inner join kullanici k on k.user_id = randevu.user_id
                        where
                            id = $1`;

    const response = await pool.query(query2, [newRandevuID]);
    response.rows[0].basl_tarih = format(
      new Date(addHours(response.rows[0].basl_tarih, -3)),
      "yyyy-MM-dd HH:mm:ss"
    );
    response.rows[0].bitis_tarih = format(
      new Date(addHours(response.rows[0].bitis_tarih, -3)),
      "yyyy-MM-dd HH:mm:ss"
    );

    return res.status(201).send({
      status: true,
      message: "Randevu Ekleme Başarılı.",
      data: response.rows[0],
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Randevu ekleme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

router.post("/randevu-update", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi güncelleyebilir.",
      data: null,
    });

  const { randevu_id, user_id, basl_tarih, bitis_tarih, baslik } = req.body;

  if (isNullOrEmpty(randevu_id))
    return res
      .status(400)
      .send({ status: false, message: `Id boş olamaz.`, data: null });
  //   if (isNullOrEmpty(user_id))
  //     return res
  //       .status(400)
  //       .send({ status: false, message: `Kullanıcı boş olamaz.`, data: null });
  if (isNullOrEmpty(baslik))
    return res
      .status(400)
      .send({ status: false, message: `Başlık boş olamaz.`, data: null });
  if (isNullOrEmpty(basl_tarih))
    return res.status(400).send({
      status: false,
      message: `Başlangıç tarihi boş olamaz.`,
      data: null,
    });
  if (isNullOrEmpty(bitis_tarih))
    return res
      .status(400)
      .send({ status: false, message: `Bitiş tarihi boş olamaz.`, data: null });

  const baslTarihUTC = addHours(new Date(basl_tarih), 3);
  const bitisTarihUTC = addHours(new Date(bitis_tarih), 3);

  try {
    const query = `update randevu 
                        set
                        basl_tarih = $1,
                        bitis_tarih = $2,
                        baslik = $3
                        where id = $4
                        `;

    await pool.query(query, [baslTarihUTC, bitisTarihUTC, baslik, randevu_id]);

    const query2 = `
                        select 
                            id, baslik, basl_tarih, bitis_tarih, k.user_id, k.ad, k.soyad
                        from randevu
                            inner join kullanici k on k.user_id = randevu.user_id
                        where
                            id = $1`;

    const response = await pool.query(query2, [randevu_id]);

    response.rows[0].basl_tarih = format(
      new Date(addHours(response.rows[0].basl_tarih, -3)),
      "yyyy-MM-dd HH:mm:ss"
    );
    response.rows[0].bitis_tarih = format(
      new Date(addHours(response.rows[0].bitis_tarih, -3)),
      "yyyy-MM-dd HH:mm:ss"
    );

    return res.status(201).send({
      status: true,
      message: "Randevu Güncelleme Başarılı.",
      data: response.rows[0],
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Randevu gücelleme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

router.post("/randevu-delete", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi silebilir.",
      data: null,
    });

  const { randevu_id } = req.body;

  // alanların boş olup olmadığının kontrolü
  if (isNullOrEmpty(randevu_id))
    return res
      .status(400)
      .send({ status: false, message: `Id boş olamaz.`, data: null });

  try {
    const randevu = await pool.query(`select * from randevu where id = $1`, [
      randevu_id,
    ]);
    if (randevu.rowCount === 0) {
      return res
        .status(400)
        .send({ status: false, message: `Bu randevu bulunamadı.`, data: null });
    }

    const query = `delete from randevu where id = $1`;

    await pool.query(query, [randevu_id]);

    return res.status(201).send({
      status: true,
      message: "Randevu Silme Başarılı.",
      data: randevu_id,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Randevu silme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

module.exports = router;
