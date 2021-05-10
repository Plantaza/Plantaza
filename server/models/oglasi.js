const mongoose = require('mongoose');
const { Rastline } = require('../controllers/rastline');
const { Uporabniki } = require('../controllers/uporabniki');

const oglasiShema = new mongoose.Schema({
  _id: { type: String, required: true },
  idRastline: { type: Rastline, required: true },
  idUporabnika: { type: Uporabniki, required: true},
  slika: { type: String, required: false }
})

mongoose.model('Oglasi', oglasiShema, 'Oglasi')