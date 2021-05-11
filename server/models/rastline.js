const mongoose = require('mongoose');

const rastlineShema = new mongoose.Schema({
    imeRastline: { type: String, required: true },
    kategorija: {type:String, required:true},
    podkategorija: {type:String, required: false},
    potrebaPoSvetlobi: { type: Number, required: true },
    procentOhranjanjaVlage: { type: Number, required: true },
    opis: {type: String, required: true}
});


mongoose.model('Rastline', rastlineShema , 'Rastline');
