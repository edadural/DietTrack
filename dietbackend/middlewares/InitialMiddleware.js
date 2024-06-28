const fs = require('fs');
const pool = require("../db");

const createTables = async () => {
    try {
        const sql = fs.readFileSync('schema.sql', 'utf8');
        await pool.query(sql);

            const result = await pool.query('SELECT * FROM admin');
            if (result.rowCount < 1) {
                /**
                 * eğer admin yoksa
                 * k_adi : admin
                 * şifre : 12345
                 */
                await pool.query(`INSERT INTO admin 
                (k_adi, ad, soyad, sifre) 
                VALUES 
                ('admin', 'eda', 'dural', '$2a$10$Lgokv9vwIGtYaNlA5azdje5Hm2cfniyIkMt1Y1kj.PlkVAZgv71Za')`)
            }
        console.log('Tablolar oluşturuldu.');
    } catch (error) {
        console.error('Hata:', error);
    }
};

module.exports = {
  createTables
};
