const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const uporabnikiShema = new mongoose.Schema({
    elektronskiNaslov: { type: String, unique: true, required: true },
    ime: { type: String, required: true },
    opis: { type:String, required: false },
    zgoscenaVrednost: { type: String, required: true },
    nakljucnaVrednost: { type: String, required: true },
    sprejetiOglasi: {type: [String]},
    zavrnjeniOglasi: {type: [String]}
});

uporabnikiShema.methods.nastaviGeslo = function (geslo) {
    this.nakljucnaVrednost = crypto.randomBytes(16).toString('hex');
    this.zgoscenaVrednost = crypto
        .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
        .toString('hex');
};

uporabnikiShema.methods.preveriGeslo = function (geslo) {
    let zgoscenaVrednost = crypto
        .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
        .toString('hex');
    return this.zgoscenaVrednost == zgoscenaVrednost;
};

uporabnikiShema.methods.generirajJwt = function () {
    const datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        elektronskiNaslov: this.elektronskiNaslov,
        ime: this.ime,
        exp: parseInt(datumPoteka.getTime() / 1000, 10)
    }, process.env.JWT_GESLO);
};

mongoose.model('Uporabniki', uporabnikiShema, 'Uporabniki');
