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

/**
 *  Routes for rastlina
 */
router.post('/rastlina',avtentikacija,ctrlRastline.postRastlina)

router.get('/rastlina',avtentikacija,ctrlRastline.getRastline)

/**
 *  Routes for avtentikacija
 */
router.post('/registracija', ctrlAvtentikacija.registracija);

router.post('/prijava', ctrlAvtentikacija.prijava);

/**
 *  Routes for uporabnik
 */
router.get('/uporabnik/all', ctrlUporabniki.uporabnikiSeznam);

router.get('/uporabnik/:id', ctrlUporabniki.preberiIzbranega);

router.post('/uporabniki/izbrisi/:id', ctrlUporabniki.izbrisiIzbranega)


/**
 *  Routes for oglasi
 */
router.get('/oglas/all', ctrlOglasi.oglasiSeznam);

router.get('/oglas/:id', ctrlOglasi.oglasiPreberiIzbranega);

router.get('/oglas/izbrisi/:id', ctrlOglasi.oglasiIzbrisiIzbranega);

router.post('/oglas', ctrlOglasi.oglasiKreiraj);

router.post('/oglas/uporabnik/:id', ctrlOglasi.oglasiUporabnika);



module.exports = router;