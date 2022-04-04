const mongoose = require('mongoose')
const warnsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    warns: { type: Number, required: true }
}
);
const model = mongoose.model('WarnSystemModel', warnsSchema)
module.exports = model;