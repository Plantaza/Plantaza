const mongoose = require('mongoose');
const { Rastline } = require('../controllers/rastline');
const { Uporabniki } = require('../controllers/uporabniki');

const oglasiSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  rastlina: { type: Rastline, required: true },
  uporabnik: { type: Uporabniki, required: true}
})

mongoose.model('Uporabniki', oglasiShema, 'Uporabniki')