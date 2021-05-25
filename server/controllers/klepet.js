//const { resolve } = require('@angular/compiler-cli/src/ngtsc/file_system');
const mongoose = require('mongoose');
const Sporocilo = mongoose.model('Sporocilo')
const Klepet = mongoose.model('Klepet')
const Uporabnik = mongoose.model('Uporabniki')



function processText(text) {
    // funkcija je uporabljena za cistenje teksta pri sporocilih
    // tako se zavarujemo pred napadi
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const novoSporocilo = (req, res) => {
    // Input
    //  - klepetId: [id uporabnikov v pogovoru]
    //  - posiljatelj: id posiljatelja
    //  - telo: tekst sporocila

    Uporabnik.findById(req.body.posiljatelj).then((uporabnik) => {
        // Uporabnik je bil najden
        // poglejmo ce obstaja klepet
        if (!uporabnik) {
            reject('Uporabnika nismo nasli')
        }
        return Klepet.findById(req.body.klepetId)

    }).then((klepet) => {
        // Uporabnik je bil najden in klepet tudi
        // gremo narediti novo sporocilo
        if (!klepet) {
            reject('Klepeta nismo nasli')
        }
        // pocistimo vsebino
        let telo = processText(req.body.telo)

        const ustvarjenoSporocilo = new Sporocilo({
            lastnikId: req.body.posiljatelj,
            telo: telo
        })

        klepet.sporocila.push(ustvarjenoSporocilo)

        klepet.save((error, success) => {
            if (error) {
                res.status(500).json({
                    status: 'Failed',
                    reason: 'Could not save message to database'
                })
            } else {
                res.status(200).json({
                    status: 'Success',
                    reason: 'Message was saved'
                })
            }
        })

    }).catch((message) => {
        res.status(404).json({
            status: 'Failed',
            reason: message
        })
    })

}

const noviKlepet = (req, res) => {
    // Input
    //  - clani: [id uporabnikov v pogovoru]
    // Ce je odgovor 200, potem je vrnjen tudi klepetId, ki ga lahko client uporabi

    const najdiUporabnike = new Promise((resolve, reject) => {
        Uporabnik.find({_id: {$in: req.body.clani}}).exec((error, uporabniki) => {
            if (error) {
                reject(error);
            } else {
                resolve(uporabniki);
            }
        })
    })

    najdiUporabnike.then(function (uporabniki) {
        const ustvarjenKlepet = new Klepet({
            clani: uporabniki
        })

        ustvarjenKlepet.save((error, success) => {
            if (error) {
                res.status(500).json(error)
            } else {
                res.status(200).json({status: "Klepet je bil ustvarjen.", klepetId: success._id})
            }
        })

    }).catch(function (error) {
        res.status(500).json(error)
    })

}

const pridobiKlepete = (req, res) => {
    // Input
    //  - uporabnikId: id uporabnika
    console.log(req.query)
    Klepet.find({}).then((klepeti) => {
        vrni = []
        if (klepeti && klepeti.length > 0){
            klepeti.forEach(klepet => {
                klepet.clani.forEach(clan => {
                    // console.log(clan)
                    // console.log(req.query.uporabnikId)
                    if(clan._id.equals( req.query.uporabnikId)){

                        vrni.push(klepet)
                    }

                })
            })
            console.log(vrni)
            res.status(200).json(vrni)
        }
        else res.status(404).json(klepeti)
    })
}

module.exports = {
    noviKlepet,
    novoSporocilo,
    pridobiKlepete
}