const mongoose = require('mongoose');
const Rastline = mongoose.model('Rastline');

const getRastlina = (req, res) => {
    res.status(200);
}

const getRastline = (req, res) => {
    console.log("Get rastline")
    res.status(200);
    res.send("Hello world");
}

const postRastlina = (req, res) => {
    res.status(200);
}


module.exports = {
    getRastlina,
    getRastline,
    postRastlina
}