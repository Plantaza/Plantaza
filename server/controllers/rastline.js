const mongoose = require('mongoose');
const Rastline = mongoose.model('Rastline');

const getRastlina = (req, res) => {

    console.log(req.params.id)
    Rastline
        .findById(req.params.id)
        .exec((napaka, rastlina) => {
            if (!rastlina) {
                return res.status(404).json({
                    "sporocilo":
                        "Ni rastline s tem idjem."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(rastlina);
        });
}

const getRastlinaByName = (req, res) => {

    console.log(req.params)

    data = req.params
    Rastline
        .find({ imeRastlina: data.name})
        .exec((napaka, rastlina) => {
            if (!rastlina) {
                return res.status(404).json({
                    "sporocilo":
                        "Ni rastline s tem imenom."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(rastlina);
        });
}

const getRastline = (req, res) => {
    Rastline
        .find()
        .exec((napaka, rastline) => {
            if (!rastline) {
                return res.status(404).json({
                    "sporocilo":
                        "Ni rastlin v bazi"
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(rastline);
        });
}

const kreirajRastlino = (req, res) => {
    let d = req.body

    console.log(d)

    var rastlina = new Rastline()

    rastlina.imeRastline = d.ime
    rastlina.kategorija = d.kategorija
    rastlina.potrebaPoSvetlobi = d.svetloba
    rastlina.procentOhranjanjaVlage = d.vlaga
    rastlina.opis = d.opis || ""
    rastlina.slika = d.slika || ""


    rastlina.save((err, plant) => {
        if (!plant) {
            return res.status(404).json({
                "sporocilo":
                    "Ni mogoče ustvariti nove rastline"
            });
        } else if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(plant);
    })
}

const filterKategorija = (req, res) => {
    Rastline
        .find({'kategorija': req.params.kategorija}).exec(function(err, rastline){
        if (err) {
            console.err(err);
            res.status(404).json({"sporocilo": "Napaka pri poizvedbi po kategoriji: " + err});
        } else {
            res.status(200).json(rastline);
        }
    })
}

const filterPodKategorija = (req, res) => {
    Rastline
        .find({'podkategorija': req.params.podkategorija}).exec(function(err, rastline){
        if (err) {
            console.err(err);
            res.status(404).json({"sporocilo": "Napaka pri poizvedbi po kategoriji: " + err});
        } else {
            res.status(200).json(rastline);
        }
    })
}

const deleteRastlina = (req, res) => {

    console.log("Brisem rastlino")

    Rastline
        .destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            return res.status(200).json(true);
        }).catch(err => {
            console.error("Napaka pri brisanju", err)
            return res.status(500).json(err);
        })
}

module.exports = {
    getRastlina,
    getRastlinaByName,
    getRastline,
    kreirajRastlino,
    filterKategorija,
    filterPodKategorija,
    deleteRastlina
}