const mongoose = require('mongoose');

const rastlineShema = new mongoose.Schema({
    _id: { type: String, required: true },
    imeRastiline: { type: String, required: true },
    kategorija: {type:String, required:true},
    podkategorija: {type:String, required: false},
    potrebaPoSvetlobi: { type: Number, required: true },
    procentOhranjanjaVlage: { type: Number, required: true },
    opis: {type: String, required: true},
    lastnikObjectId: {type: String, required:true}
});


mongoose.model('Rastline', rastlineShema , 'Rastline');
