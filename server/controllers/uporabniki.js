const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Uporabniki = mongoose.model('Uporabniki')

const uporabnikiSeznam = (req, res) => {
  Uporabniki
      .find()
      .sort('-date')
      .limit(10)
      .exec((napaka, uporabniki) => {
          if (!uporabniki) {
              return res.status(404).json({
                  "sporocilo":
                      "Ne dobim uporabnikov."
              });
          } else if (napaka) {
              return res.status(500).json(napaka);
          }
          res.status(200).json(uporabniki);
      });
};

const preberiIzbranega = (req, res) => {

  if (!req.params.idUporabnika) {
      return res.status(400).json({
          "sporocilo":
              "Zahtevek brez podanega ID-ja"
      });
  }

  Uporabniki
      .findById(req.params.idUporabnika)
      .exec((napaka, uporabnik) => {
          if (!uporabnik) {
              return res.status(404).json({
                  "sporocilo":
                      "Uporabnik s to kombinacijo gesla in email ne obstaja"
              });
          } else if (napaka) {
              return res.status(500).json(napaka);
          }
          res.status(200).json(uporabnik);
      });
};

const izbrisiIzbranega = (req, res) => {
  const {idUporabnik} = req.params;
  if (idUporabnika) {
      Uporabniki
          .findByIdAndRemove(idUporabnika)
          .exec((napaka) => {
              if (napaka) {
                  return res.status(500).json(napaka);
              }
              res.status(204).json(null);
          });
  } else {
      res.status(400).json({
          "sporocilo":
              "Ne dobim uporabnika. idUporabnik ni dobljen, ampak je obvezen parameter."
      });
  }
};

module.exports = {
    uporabnikiSeznam,
    preberiIzbranega,
    izbrisiIzbranega
}