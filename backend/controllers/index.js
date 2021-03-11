const ClientController = require('./ClientController');
const AppointmentController = require('./AppointmentController');

module.exports = {
    ClientCtrl: new ClientController(),
    AppointmentCtrl: new AppointmentController()
};
