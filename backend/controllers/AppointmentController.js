const {validationResult} = require("express-validator");
const {Appointment, Client} = require('../models');

function AppointmentController() {
}

const create = async function (req, res) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array()
        });
    }

    try {
        await Client.findOne({_id: req.body.clientId})
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: 'CLIENT_NOT_FOUND'
        });
    }

    await Appointment.create({
        clientId: req.body.clientId,
        diagnosis: req.body.diagnosis,
        procedure: req.body.procedure,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time
    }, function (err, doc) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }

        res.status(201).json({
            success: true,
            data: doc
        });
    });
};

const update = async function (req, res) {
    const appointmentId = req.params.id;
    const errors = validationResult(req);

    const data = {
        diagnosis: req.body.diagnosis,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time
    };
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array()
        });
    }

    Appointment.updateOne({_id: appointmentId}, {$set: data}, function (
        err,
        doc
    ) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                success: false,
                message: 'APPOINTMENT_NOT_FOUND'
            });
        }
        res.json({
            success: true,
            data: doc
        });
    });
};

const remove = async function (req, res) {
    const id = req.params.id;

    try {
        await Appointment.findOne({_id: id});
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: 'APPOINTMENT_NOT_FOUND'
        });
    }

    Appointment.deleteOne({_id: id}, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }
        res.json({
            status: 'success'
        });
    });
};

const all = async function (req, res) {
    try {
        const appointments = await Appointment.find({})
            .populate('clientId')
            .exec();
        return res.json({
            success: true,
            data: appointments,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        }, {});
    }


};

const show = async function (req, res) {
    try {
        const appointments = await Appointment.find({clientId:req.params.id}).exec();

        return res.status(200).json({
            success: true,
            data: appointments,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        }, {});
    }

};

AppointmentController.prototype = {
    all,
    show,
    create,
    remove,
    update
}

module.exports = AppointmentController;
