const mongoose = require('mongoose');
const Uporabnik = require('./uporabniki');

const sporociloShema = new mongoose.Schema({
    lastnikId: {type: String, required: true},
    telo: {type: String, default: ""},
    datum: {type: Date, default: Date.now}
})

const klepetShema = new mongoose.Schema({
    imeKlepeta: {type: String, default: function() {
            var imena = [];
            for (var uporabnik of this.clani) {
                imena.push(uporabnik.ime)
            }
            return imena.join(', ')
        }},
    clani: {type: [Uporabnik], required: true},
    sporocila: {type: [sporociloShema], default: []},
    arhiviran: {type: Boolean, default: false}
})



mongoose.model('Sporocilo', sporociloShema, 'Sporocila')
mongoose.model('Klepet', klepetShema, 'Klepeti')