const Client = require('./Client');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const AppointmentSchema = new Schema({
        clientId: {type: Schema.Types.ObjectId, ref: 'Client'},
        diagnosis: String,
        price: Number,
        procedure: String,
        date: String,
        time: String,
    },
    {
        timestamps: true,
    });

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
