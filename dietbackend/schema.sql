CREATE TABLE IF NOT EXISTS kullanici (
    user_id SERIAL PRIMARY KEY,
    k_adi VARCHAR(50) NOT NULL,
    ad VARCHAR(50) NOT NULL,
    soyad VARCHAR(50) NOT NULL,
    sifre VARCHAR(255) NOT NULL,
    e_posta VARCHAR(100) NOT NULL,
    telf VARCHAR(20),
    giris_tarih TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_id INT NOT NULL,
    heigth DECIMAL(5, 2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS randevu (
    id SERIAL PRIMARY KEY,
    basl_tarih TIMESTAMP NOT NULL,
    bitis_tarih TIMESTAMP,
    baslik VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    admin_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS beslenme (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    kahvalti VARCHAR(255) NOT NULL,
    ogle VARCHAR(255) NOT NULL,
    aksam VARCHAR(255) NOT NULL,
    atistirma VARCHAR(255),
    tarih TIMESTAMP NOT NULL,
    kahvalti_tik BOOLEAN DEFAULT FALSE,
    ogle_tik BOOLEAN DEFAULT FALSE,
    aksam_tik BOOLEAN DEFAULT FALSE,
    atistirma_tik BOOLEAN DEFAULT FALSE,
    admin_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS home (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    olcum_tarihi TIMESTAMP NOT NULL,
    agirlik DECIMAL(5, 2) NOT NULL,
    agirlikfarki DECIMAL(5, 2),
    yagsiz DECIMAL(5, 2) NOT NULL,
    yagsizfark DECIMAL(5, 2),
    sivi DECIMAL(5, 2) NOT NULL,
    sivifark DECIMAL(5, 2),
    yag DECIMAL(5, 2) NOT NULL,
    yagfark DECIMAL(5, 2),
    admin_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin (
    admin_id SERIAL PRIMARY KEY,
    k_adi VARCHAR(50) NOT NULL,
    ad VARCHAR(50) NOT NULL,
    soyad VARCHAR(50) NOT NULL,
    sifre VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    tarih TIMESTAMP NOT NULL,
    note VARCHAR(255) NOT NULL,
    admin_id INT NOT NULL
);

-- DROP TABLE IF EXISTS randevu CASCADE;
-- DROP TABLE IF EXISTS beslenme CASCADE;
-- DROP TABLE IF EXISTS home CASCADE;
-- DROP TABLE IF EXISTS notes CASCADE;
-- DROP TABLE IF EXISTS kullanici CASCADE;