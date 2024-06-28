// HomeController.js

const express = require("express");
const router = express.Router();
const checkAuth = require("../../middlewares/JwtMiddleware.js");
const { isNullOrEmpty } = require("../../helper/utils.js");
const pool = require("../../db.js");
const { addHours, format } = require("date-fns");

router.post("/home-get", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi görüntüleyebilir.",
      data: null,
    });

  const home_id = req.body?.home_id;
  const user_id = req.body?.user_id;
  if (!isNullOrEmpty(home_id)) {
    try {
      const query = ` select 
                                id, olcum_tarihi, agirlik, agirlikfarki, yagsiz, yagsizfark, sivi, sivifark, yag, yagfark, k.user_id, k.ad, k.soyad
                            from home
                                inner join kullanici k on k.user_id = home.user_id
                            where id = $1 and admin_id = $2;`;
      const randevu = await pool.query(query, [home_id, req.auth.id]);
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
    let users;
    try {
      let query = ` select 
                                id, olcum_tarihi, agirlik, agirlikfarki, yagsiz, yagsizfark, sivi, sivifark, yag, yagfark, k.user_id, k.ad, k.soyad
                            from home
                                inner join kullanici k on k.user_id = home.user_id
                            where home.admin_id = $1`;
      if (user_id < 1) {
        users = await pool.query(query, [req.auth.id]);
      } else {
        query += ` and home.user_id = $2`;
        users = await pool.query(query, [req.auth.id, user_id]);
      }
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

router.post("/home-add", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi ekleyebilir.",
      data: null,
    });

  const { user_id, olcum_tarihi, agirlik, yagsiz, sivi, yag } = req.body;

  // alanların boş olup olmadığının kontrolü
  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Kullanıcı boş olamaz.`, data: null });
  if (isNullOrEmpty(olcum_tarihi))
    return res
      .status(400)
      .send({ status: false, message: `Tarih boş olamaz.`, data: null });
  // if (isNullOrEmpty(agirlik))
  //     return res.status(400).send({ status: false, message: `Agirlik boş olamaz.`, data: null });
  // if (isNullOrEmpty(yagsiz))
  //     return res.status(400).send({ status: false, message: `Yağsız oranı boş olamaz.`, data: null });
  // if (isNullOrEmpty(sivi))
  //     return res.status(400).send({ status: false, message: `Sıvı oranı boş olamaz.`, data: null });
  // if (isNullOrEmpty(yag))
  //     return res.status(400).send({ status: false, message: `Yağ oranı boş olamaz.`, data: null });

  const olcum_tarihiUTC = addHours(new Date(olcum_tarihi), 3);

  let agirlikfarki = 0;
  let yagsizfark = 0;
  let sivifark = 0;
  let yagfark = 0;

  try {
    const query = `insert into home 
                            (olcum_tarihi, agirlik, yagsiz, sivi, yag, user_id, agirlikfarki, yagsizfark, sivifark, yagfark, admin_id)
                            values
                            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                            returning id
                            `;

    const result = await pool.query(query, [
      olcum_tarihiUTC,
      agirlik,
      yagsiz,
      sivi,
      yag,
      user_id,
      agirlikfarki,
      yagsizfark,
      sivifark,
      yagfark,
      req.auth.id,
    ]);
    const newHomeID = result.rows[0].id;

    const sql = `
                    select *
                    from home
                    where id < $1 and user_id = $2
                    order by id desc
                    limit 1`;

    const val = await pool.query(sql, [newHomeID, user_id]);
    const eskiVeri = val?.rows[0];

    if (val.rowCount > 0) {
      agirlikfarki =
        agirlik > 0 ? ((agirlik - eskiVeri.agirlik) / agirlik) * 100 : 0;
      yagsizfark = yagsiz > 0 ? ((yagsiz - eskiVeri.yagsiz) / yagsiz) * 100 : 0;
      sivifark = sivi > 0 ? ((sivi - eskiVeri.sivi) / sivi) * 100 : 0;
      yagfark = yag > 0 ? ((yag - eskiVeri.yag) / yag) * 100 : 0;

      const updatesql = `update home 
                                    set
                                    agirlikfarki = $1,
                                    yagsizfark = $2,
                                    sivifark = $3,
                                    yagfark = $4
                                    where id = $5
                                    `;
      await pool.query(updatesql, [
        agirlikfarki,
        yagsizfark,
        sivifark,
        yagfark,
        newHomeID,
      ]);
    }

    const query2 = `
                        select 
                            id, olcum_tarihi, agirlik, agirlikfarki, yagsiz, yagsizfark, sivi, sivifark, yag, yagfark, k.user_id, k.ad, k.soyad
                        from home
                            inner join kullanici k on k.user_id = home.user_id
                        where
                            id = $1`;

    const response = await pool.query(query2, [newHomeID]);

    return res.status(201).send({
      status: true,
      message: "Veri Ekleme Başarılı.",
      data: response.rows[0],
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Veri ekleme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

router.post("/home-update", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi güncelleyebilir.",
      data: null,
    });

  const { home_id, user_id, olcum_tarihi, agirlik, yagsiz, sivi, yag } =
    req.body;

  if (isNullOrEmpty(home_id))
    return res
      .status(400)
      .send({ status: false, message: `Id boş olamaz.`, data: null });
  if (isNullOrEmpty(user_id))
    return res
      .status(400)
      .send({ status: false, message: `Kullanıcı boş olamaz.`, data: null });
  if (isNullOrEmpty(olcum_tarihi))
    return res
      .status(400)
      .send({ status: false, message: `Tarih boş olamaz.`, data: null });
  // if (isNullOrEmpty(agirlik))
  //     return res.status(400).send({ status: false, message: `Agirlik boş olamaz.`, data: null });
  // if (isNullOrEmpty(yagsiz))
  //     return res.status(400).send({ status: false, message: `Yağsız oranı boş olamaz.`, data: null });
  // if (isNullOrEmpty(sivi))
  //     return res.status(400).send({ status: false, message: `Sıvı oranı boş olamaz.`, data: null });
  // if (isNullOrEmpty(yag))
  //     return res.status(400).send({ status: false, message: `Yağ oranı boş olamaz.`, data: null });

  const olcum_tarihiUTC = addHours(new Date(olcum_tarihi), 3);
  let agirlikfarki = 0;
  let yagsizfark = 0;
  let sivifark = 0;
  let yagfark = 0;

  try {
    const sql = `
                    select *
                    from home
                    where id < $1 and user_id = $2
                    order by id desc
                    limit 1`;

    const val = await pool.query(sql, [home_id, user_id]);
    const eskiVeri = val?.rows[0];

    if (val.rowCount > 0) {
      agirlikfarki = ((agirlik - eskiVeri.agirlik) / agirlik) * 100;
      yagsizfark = ((yagsiz - eskiVeri.yagsiz) / yagsiz) * 100;
      sivifark = ((sivi - eskiVeri.sivi) / sivi) * 100;
      yagfark = ((yag - eskiVeri.yag) / yag) * 100;
    }

    const query = `update home 
                        set
                        olcum_tarihi = $1,
                        agirlik = $2,
                        yagsiz = $3,
                        sivi = $4,
                        yag = $5,
                        user_id = $6,
                        agirlikfarki = $7,
                        yagsizfark = $8,
                        sivifark = $9,
                        yagfark = $10
                        where id = $11
                        `;

    await pool.query(query, [
      olcum_tarihiUTC,
      agirlik,
      yagsiz,
      sivi,
      yag,
      user_id,
      agirlikfarki,
      yagsizfark,
      sivifark,
      yagfark,
      home_id,
    ]);

    const query2 = `
                        select 
                            id, olcum_tarihi, agirlik, agirlikfarki, yagsiz, yagsizfark, sivi, sivifark, yag, yagfark, k.user_id, k.ad, k.soyad
                        from home
                            inner join kullanici k on k.user_id = home.user_id
                        where
                            id = $1`;

    const response = await pool.query(query2, [home_id]);

    return res.status(201).send({
      status: true,
      message: "Veri Güncelleme Başarılı.",
      data: response.rows[0],
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Veri gücelleme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

router.post("/home-delete", checkAuth, async (req, res) => {
  if (!req.auth.is_admin)
    return res.status(403).send({
      status: false,
      message: "Sadece admin yetkisi silebilir.",
      data: null,
    });

  const { home_id } = req.body;

  // alanların boş olup olmadığının kontrolü
  if (isNullOrEmpty(home_id))
    return res
      .status(400)
      .send({ status: false, message: `Id boş olamaz.`, data: null });

  try {
    const randevu = await pool.query(`select * from home where id = $1`, [
      home_id,
    ]);
    if (randevu.rowCount === 0) {
      return res
        .status(400)
        .send({ status: false, message: `Bu veri bulunamadı.`, data: null });
    }

    const query = `delete from home where id = $1`;

    await pool.query(query, [home_id]);

    return res
      .status(201)
      .send({ status: true, message: "Veri Silme Başarılı.", data: home_id });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Veri silme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

router.post("/user-home-get", checkAuth, async (req, res) => {
  if (!req.auth.is_user)
    return res.status(403).send({
      status: false,
      message: "Sadece user yetkisi görüntüleyebilir.",
      data: null,
    });

  try {
    const query = ` select 
                            id, olcum_tarihi, agirlik, agirlikfarki, yagsiz, yagsizfark, sivi, sivifark, yag, yagfark, k.user_id, k.ad, k.soyad
                        from home
                            inner join kullanici k on k.user_id = home.user_id
                        where home.user_id = $1
                        `;
    const homes = await pool.query(query, [req.auth.id]);

    return res.status(201).send({
      status: true,
      message: "Veri(ler) Listelendi.",
      data: homes.rows,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `Veri getirme sırasında bir hata oluştu. Hata: ${err}`,
      data: null,
    });
  }
});

module.exports = router;
