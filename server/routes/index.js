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

router.post('/rastlina',avtentikacija,ctrlRastline.postRastlina)

router.get('/rastlina',avtentikacija,ctrlRastline.getRastline)


router.post('/registracija', ctrlAvtentikacija.registracija);

router.post('/prijava', ctrlAvtentikacija.prijava);

module.exports = router;