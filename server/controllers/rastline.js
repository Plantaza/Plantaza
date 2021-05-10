const mongoose = require('mongoose');
const Rastline = mongoose.model('Rastline');

const getRastlina = (req, res) => {
    Rastline
        .findById(req.query.id)
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

const postRastlina = (req, res) => {
    let d = req.body

    var rastlina = new Rastline()

    rastlina.imeRastline = d.imeRastline
    rastlina.kategorija = d.kategorija
    rastlina.podkategorija = d.podkategorija
    rastlina.potrebaPoSvetlobi = d.potrebaPoSvetlobi
    rastlina.procentOhranjanjaVlage = d.procentOhranjanjaVlage
    rastlina.opis = d.opis || ""
    rastlina.lastnikObjectId = d.lastnikObjectId


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


module.exports = {
    getRastlina,
    getRastline,
    postRastlina,
    filterKategorija,
    filterPodKategorija
}