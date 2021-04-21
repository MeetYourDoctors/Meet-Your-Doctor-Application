const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var channelingSchema = new Schema({
    appointmentId:{type:String,required:true},
    approve:{type:Boolean},
    zoomLink:{type:String},
    patientId:{type:String},
    doctorId:{type:String}
});

module.exports = mongoose.model('Channeling',channelingSchema);