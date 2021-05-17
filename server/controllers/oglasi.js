const mongoose = require('mongoose');

const Oglasi = mongoose.model('Oglasi')

const oglasiSeznam = (req, res) => {

    console.log("Seznam oglasov")
  Oglasi
      .find()
      .sort('-date')
      .limit(50)
      .exec((napaka, oglasi) => {
          if (!oglasi) {
              return res.status(404).json({
                  "sporocilo":
                      "Ne dobim oglasov."
              });
          } else if (napaka) {
              return res.status(500).json(napaka);
          }
          res.status(200).json(oglasi);
      });
};

const oglasiUporabnika = (req, res) => {
  if (!req.params.idUporabnika) {
      return res.status(400).json({
          "sporocilo":
              "ID uporabnika je obvezen podatek"
      });
  }
  Oglasi
      .find({uporabnikId: req.params.idUporabnika})
      .select("-slika")
      .sort('-date')
      .limit(10)
      .exec((napaka, oglasi) => {
          if (!oglasi) {
              return res.status(404).json({
                  "sporocilo":
                      "Ne dobim oglasov."
              });
          } else if (napaka) {
              return res.status(500).json(napaka);
          }
          res.status(200).json(oglasi);
      });
};

const oglasiPreberiIzbranega = (req, res) => {
  Oglas
      .findById(req.params.idOglasa)
      .exec((napaka, oglas) => {
          if (!oglas) {
              return res.status(404).json({
                  "sporocilo":
                      "Oglas s podanim ID-jem žal ni bil najden."
              });
          } else if (napaka) {
              return res.status(500).json(napaka);
          }
          res.status(200).json(oglas);
      });
};

const oglasiIzbrisiIzbranega = (req, res) => {
  const {idOglasa} = req.params;
  if (idOglasa) {
      Oglasi
          .findByIdAndRemove(idOglasa)
          .exec((napaka) => {
              if (napaka) {
                  return res.status(500).json(napaka);
              }
              res.status(204).json(null);
          });
  } else {
      res.status(404).json({
          "sporocilo":
              "Ne dobim oglasa. IdOglasa ni dobljen, ampak je obvezen parameter."
      });
  }
};

const oglasiKreiraj = (req, res) => {

    console.log("Kreiram oglas")

    var data = req.body

    if (!data.idRastline) {
        return res.status(404).json({
            "sporocilo":
                "Id je obvezen podatek"
        });
    }
    if (!data.idUporabnika) {
        return res.status(404).json({
            "sporocilo":
                "Id Uporabnika je obvezen podatek"
        });
    }
    var slika = data.slika;
    //   slika = slika.replace('data:image/png;base64,', '');
    Oglasi.create({
        idRastline: data.idRastline,
        idUporabnika: data.idUporabnika,
        slika: data.slika
    }, (napaka, oglas) => {
        if (napaka) {
            res.status(400).json(napaka);
        } else {
            res.status(201).json(oglas)
        }
    });
};

module.exports = {
  oglasiSeznam, 
  oglasiUporabnika, 
  oglasiPreberiIzbranega, 
  oglasiIzbrisiIzbranega,
  oglasiKreiraj
}