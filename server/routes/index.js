const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
const avtentikacija = jwt({
    secret: process.env.JWT_GESLO,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const ctrlAvtentikacija = require('../controllers/avtentikacija');
const ctrlRastline = require('../controllers/rastline');
const ctrlUporabniki = require('../controllers/uporabniki');
const ctrlOglasi = require('../controllers/oglasi');
const ctrlMessages = require('../controllers/klepet')

/**
 *  Routes for rastlina
 */

router.post('/rastlina', ctrlRastline.kreirajRastlino);

router.get('/rastlina', ctrlRastline.getRastline);

router.get('/rastlina/id/:id', ctrlRastline.getRastlina);

router.get('/rastlina/name/:name', ctrlRastline.getRastlinaByName);

router.get('/rastlina/kategorija/:kategorija', ctrlRastline.filterKategorija)

router.get('/rastlina/podkategorija/:podkategorija', ctrlRastline.filterPodKategorija)

router.delete('/rastlina/delete/:id', ctrlRastline.deleteRastlina);

/**
 *  Routes for avtentikacija
 */
router.post('/registracija', ctrlAvtentikacija.registracija);

router.post('/prijava', ctrlAvtentikacija.prijava);

/**
 *  Routes for uporabnik
 */

router.post('/uporabnik/posodobi', ctrlUporabniki.posodobiUporabnika)

router.get('/uporabnik/all', ctrlUporabniki.uporabnikiSeznam);

router.get('/uporabnik/:idUporabnika', ctrlUporabniki.preberiIzbranega);

router.post('/uporabniki/izbrisi/:id', ctrlUporabniki.izbrisiIzbranega)

/**
 *  Routes for oglasi
 */
router.post('/oglas', ctrlOglasi.oglasiKreiraj);

router.get('/oglas/all', ctrlOglasi.oglasiSeznam);

router.get('/oglas/:id', ctrlOglasi.oglasiPreberiIzbranega);

router.get('/oglas/izbrisi/:id', ctrlOglasi.oglasiIzbrisiIzbranega);

router.post('/oglas/uporabnik/:id', ctrlOglasi.oglasiUporabnika);

router.post('/oglas/sprejmi', ctrlOglasi.sprejmiOglas)

router.post('/oglas/zavrni', ctrlOglasi.zavrniOglas)

/**
 * Routes for klepet
 */

router.post("/klepeti", ctrlMessages.noviKlepet)

router.post("/sporocilo", ctrlMessages.novoSporocilo)

router.get("/klepeti", ctrlMessages.pridobiKlepete)

module.exports = router;