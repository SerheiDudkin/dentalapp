const {validationResult} = require("express-validator");
const {Appointment, Client} = require('../models');
const mongoose = require('mongoose');
const {groupBy} = require('lodash');

function AppointmentController() {
}

const create = async function (req, res) {
    const errors = validationResult(req);
    const data = {
        client: req.body.client,
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
    try {
        await Client.findOne({_id: data.client});
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: 'CLIENT_NOT_FOUND'
        });
    }

    Appointment.create(data, function (err, doc) {
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

const all = function (req, res) {
    Appointment.find({})
        .populate('client')
        .exec(function (err, docs) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err
                }, {});
            }

            });

            res.json({
                success: true,
                data: [{"title":"11 февраля","data":[{"user_id":1,"is_active":false,"balance":852,"diagnosis":"массаж лица","time":"20:22","date":"Thu Feb 11 2021 14:23:26 GMT+0000 (UTC)","user":{"_id":1,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Лариса Тюленева","phone":"+38 (931) 469-20-19"}},{"user_id":2,"is_active":true,"balance":615,"diagnosis":"массаж лица","time":"14:30","date":"Thu Feb 25 2021 14:05:09 GMT+0000 (UTC)","user":{"_id":2,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Ирина Коваленко","phone":"+38 (843) 572-24-25"}},{"user_id":3,"is_active":true,"balance":926,"diagnosis":"комбинированная чистка","time":"15:49","date":"Sat Feb 20 2021 17:16:13 GMT+0000 (UTC)","user":{"_id":3,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Надежда Коломиец","phone":"+38 (905) 598-30-35"}},{"user_id":4,"is_active":true,"balance":663,"diagnosis":"массаж лица","time":"15:24","date":"Sun Feb 28 2021 00:14:42 GMT+0000 (UTC)","user":{"_id":4,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Алла Ивановна","phone":"+38 (839) 452-29-92"}},{"user_id":5,"is_active":false,"balance":704,"diagnosis":"маска","time":"12:30","date":"Wed Feb 24 2021 23:00:44 GMT+0000 (UTC)","user":{"_id":5,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Светлана Татаренкова","phone":"+38 (895) 506-31-64"}},{"user_id":6,"is_active":false,"balance":892,"diagnosis":"маска","time":"14:48","date":"Thu Feb 25 2021 11:52:23 GMT+0000 (UTC)","user":{"_id":6,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Houston George","phone":"+38 (967) 528-34-55"}}]},{"title":"25 февраля","data":[{"user_id":1,"is_active":false,"balance":852,"diagnosis":"массаж лица","time":"20:22","date":"Thu Feb 11 2021 14:23:26 GMT+0000 (UTC)","user":{"_id":1,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Ferguson Lowery","phone":"+38 (931) 469-20-19"}},{"user_id":2,"is_active":true,"balance":615,"diagnosis":"массаж лица","time":"14:30","date":"Thu Feb 25 2021 14:05:09 GMT+0000 (UTC)","user":{"_id":2,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Jordan Rocha","phone":"+38 (843) 572-24-25"}},{"user_id":3,"is_active":true,"balance":926,"diagnosis":"комбинированная чистка","time":"15:49","date":"Sat Feb 20 2021 17:16:13 GMT+0000 (UTC)","user":{"_id":3,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Shannon Vinson","phone":"+38 (905) 598-30-35"}},{"user_id":4,"is_active":true,"balance":663,"diagnosis":"массаж лица","time":"15:24","date":"Sun Feb 28 2021 00:14:42 GMT+0000 (UTC)","user":{"_id":4,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Dale Burt","phone":"+38 (839) 452-29-92"}},{"user_id":5,"is_active":false,"balance":704,"diagnosis":"маска","time":"12:30","date":"Wed Feb 24 2021 23:00:44 GMT+0000 (UTC)","user":{"_id":5,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Whitley Atkinson","phone":"+38 (895) 506-31-64"}},{"user_id":6,"is_active":false,"balance":892,"diagnosis":"маска","time":"14:48","date":"Thu Feb 25 2021 11:52:23 GMT+0000 (UTC)","user":{"_id":6,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Houston George","phone":"+38 (967) 528-34-55"}}]},{"title":"20 февраля","data":[{"user_id":1,"is_active":false,"balance":852,"diagnosis":"массаж лица","time":"20:22","date":"Thu Feb 11 2021 14:23:26 GMT+0000 (UTC)","user":{"_id":1,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Ferguson Lowery","phone":"+38 (931) 469-20-19"}},{"user_id":2,"is_active":true,"balance":615,"diagnosis":"массаж лица","time":"14:30","date":"Thu Feb 25 2021 14:05:09 GMT+0000 (UTC)","user":{"_id":2,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Jordan Rocha","phone":"+38 (843) 572-24-25"}},{"user_id":3,"is_active":true,"balance":926,"diagnosis":"комбинированная чистка","time":"15:49","date":"Sat Feb 20 2021 17:16:13 GMT+0000 (UTC)","user":{"_id":3,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Shannon Vinson","phone":"+38 (905) 598-30-35"}},{"user_id":4,"is_active":true,"balance":663,"diagnosis":"массаж лица","time":"15:24","date":"Sun Feb 28 2021 00:14:42 GMT+0000 (UTC)","user":{"_id":4,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Dale Burt","phone":"+38 (839) 452-29-92"}},{"user_id":5,"is_active":false,"balance":704,"diagnosis":"маска","time":"12:30","date":"Wed Feb 24 2021 23:00:44 GMT+0000 (UTC)","user":{"_id":5,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Whitley Atkinson","phone":"+38 (895) 506-31-64"}},{"user_id":6,"is_active":false,"balance":892,"diagnosis":"маска","time":"14:48","date":"Thu Feb 25 2021 11:52:23 GMT+0000 (UTC)","user":{"_id":6,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Houston George","phone":"+38 (967) 528-34-55"}}]},{"title":"28 февраля","data":[{"user_id":1,"is_active":false,"balance":852,"diagnosis":"массаж лица","time":"20:22","date":"Thu Feb 11 2021 14:23:26 GMT+0000 (UTC)","user":{"_id":1,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Ferguson Lowery","phone":"+38 (931) 469-20-19"}},{"user_id":2,"is_active":true,"balance":615,"diagnosis":"массаж лица","time":"14:30","date":"Thu Feb 25 2021 14:05:09 GMT+0000 (UTC)","user":{"_id":2,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Jordan Rocha","phone":"+38 (843) 572-24-25"}},{"user_id":3,"is_active":true,"balance":926,"diagnosis":"комбинированная чистка","time":"15:49","date":"Sat Feb 20 2021 17:16:13 GMT+0000 (UTC)","user":{"_id":3,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Shannon Vinson","phone":"+38 (905) 598-30-35"}},{"user_id":4,"is_active":true,"balance":663,"diagnosis":"массаж лица","time":"15:24","date":"Sun Feb 28 2021 00:14:42 GMT+0000 (UTC)","user":{"_id":4,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Dale Burt","phone":"+38 (839) 452-29-92"}},{"user_id":5,"is_active":false,"balance":704,"diagnosis":"маска","time":"12:30","date":"Wed Feb 24 2021 23:00:44 GMT+0000 (UTC)","user":{"_id":5,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Whitley Atkinson","phone":"+38 (895) 506-31-64"}},{"user_id":6,"is_active":false,"balance":892,"diagnosis":"маска","time":"14:48","date":"Thu Feb 25 2021 11:52:23 GMT+0000 (UTC)","user":{"_id":6,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Houston George","phone":"+38 (967) 528-34-55"}}]},{"title":"24 февраля","data":[{"user_id":1,"is_active":false,"balance":852,"diagnosis":"массаж лица","time":"20:22","date":"Thu Feb 11 2021 14:23:26 GMT+0000 (UTC)","user":{"_id":1,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Ferguson Lowery","phone":"+38 (931) 469-20-19"}},{"user_id":2,"is_active":true,"balance":615,"diagnosis":"массаж лица","time":"14:30","date":"Thu Feb 25 2021 14:05:09 GMT+0000 (UTC)","user":{"_id":2,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Jordan Rocha","phone":"+38 (843) 572-24-25"}},{"user_id":3,"is_active":true,"balance":926,"diagnosis":"комбинированная чистка","time":"15:49","date":"Sat Feb 20 2021 17:16:13 GMT+0000 (UTC)","user":{"_id":3,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Shannon Vinson","phone":"+38 (905) 598-30-35"}},{"user_id":4,"is_active":true,"balance":663,"diagnosis":"массаж лица","time":"15:24","date":"Sun Feb 28 2021 00:14:42 GMT+0000 (UTC)","user":{"_id":4,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Dale Burt","phone":"+38 (839) 452-29-92"}},{"user_id":5,"is_active":false,"balance":704,"diagnosis":"маска","time":"12:30","date":"Wed Feb 24 2021 23:00:44 GMT+0000 (UTC)","user":{"_id":5,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Whitley Atkinson","phone":"+38 (895) 506-31-64"}},{"user_id":6,"is_active":false,"balance":892,"diagnosis":"маска","time":"14:48","date":"Thu Feb 25 2021 11:52:23 GMT+0000 (UTC)","user":{"_id":6,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Houston George","phone":"+38 (967) 528-34-55"}}]},{"title":"25 февраля","data":[{"user_id":1,"is_active":false,"balance":852,"diagnosis":"массаж лица","time":"20:22","date":"Thu Feb 11 2021 14:23:26 GMT+0000 (UTC)","user":{"_id":1,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Ferguson Lowery","phone":"+38 (931) 469-20-19"}},{"user_id":2,"is_active":true,"balance":615,"diagnosis":"массаж лица","time":"14:30","date":"Thu Feb 25 2021 14:05:09 GMT+0000 (UTC)","user":{"_id":2,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Jordan Rocha","phone":"+38 (843) 572-24-25"}},{"user_id":3,"is_active":true,"balance":926,"diagnosis":"комбинированная чистка","time":"15:49","date":"Sat Feb 20 2021 17:16:13 GMT+0000 (UTC)","user":{"_id":3,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Shannon Vinson","phone":"+38 (905) 598-30-35"}},{"user_id":4,"is_active":true,"balance":663,"diagnosis":"массаж лица","time":"15:24","date":"Sun Feb 28 2021 00:14:42 GMT+0000 (UTC)","user":{"_id":4,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Dale Burt","phone":"+38 (839) 452-29-92"}},{"user_id":5,"is_active":false,"balance":704,"diagnosis":"маска","time":"12:30","date":"Wed Feb 24 2021 23:00:44 GMT+0000 (UTC)","user":{"_id":5,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Whitley Atkinson","phone":"+38 (895) 506-31-64"}},{"user_id":6,"is_active":false,"balance":892,"diagnosis":"маска","time":"14:48","date":"Thu Feb 25 2021 11:52:23 GMT+0000 (UTC)","user":{"_id":6,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Houston George","phone":"+38 (967) 528-34-55"}}]},{"title":"11 февраля","data":[{"user_id":1,"is_active":false,"balance":852,"diagnosis":"массаж лица","time":"20:22","date":"Thu Feb 11 2021 14:23:26 GMT+0000 (UTC)","user":{"_id":1,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Ferguson Lowery","phone":"+38 (931) 469-20-19"}},{"user_id":2,"is_active":true,"balance":615,"diagnosis":"массаж лица","time":"14:30","date":"Thu Feb 25 2021 14:05:09 GMT+0000 (UTC)","user":{"_id":2,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Jordan Rocha","phone":"+38 (843) 572-24-25"}},{"user_id":3,"is_active":true,"balance":926,"diagnosis":"комбинированная чистка","time":"15:49","date":"Sat Feb 20 2021 17:16:13 GMT+0000 (UTC)","user":{"_id":3,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Shannon Vinson","phone":"+38 (905) 598-30-35"}},{"user_id":4,"is_active":true,"balance":663,"diagnosis":"массаж лица","time":"15:24","date":"Sun Feb 28 2021 00:14:42 GMT+0000 (UTC)","user":{"_id":4,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Dale Burt","phone":"+38 (839) 452-29-92"}},{"user_id":5,"is_active":false,"balance":704,"diagnosis":"маска","time":"12:30","date":"Wed Feb 24 2021 23:00:44 GMT+0000 (UTC)","user":{"_id":5,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Whitley Atkinson","phone":"+38 (895) 506-31-64"}},{"user_id":6,"is_active":false,"balance":892,"diagnosis":"маска","time":"14:48","date":"Thu Feb 25 2021 11:52:23 GMT+0000 (UTC)","user":{"_id":6,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Houston George","phone":"+38 (967) 528-34-55"}}]},{"title":"13 февраля","data":[{"user_id":1,"is_active":false,"balance":852,"diagnosis":"массаж лица","time":"20:22","date":"Thu Feb 11 2021 14:23:26 GMT+0000 (UTC)","user":{"_id":1,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Ferguson Lowery","phone":"+38 (931) 469-20-19"}},{"user_id":2,"is_active":true,"balance":615,"diagnosis":"массаж лица","time":"14:30","date":"Thu Feb 25 2021 14:05:09 GMT+0000 (UTC)","user":{"_id":2,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Jordan Rocha","phone":"+38 (843) 572-24-25"}},{"user_id":3,"is_active":true,"balance":926,"diagnosis":"комбинированная чистка","time":"15:49","date":"Sat Feb 20 2021 17:16:13 GMT+0000 (UTC)","user":{"_id":3,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Shannon Vinson","phone":"+38 (905) 598-30-35"}},{"user_id":4,"is_active":true,"balance":663,"diagnosis":"массаж лица","time":"15:24","date":"Sun Feb 28 2021 00:14:42 GMT+0000 (UTC)","user":{"_id":4,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Dale Burt","phone":"+38 (839) 452-29-92"}},{"user_id":5,"is_active":false,"balance":704,"diagnosis":"маска","time":"12:30","date":"Wed Feb 24 2021 23:00:44 GMT+0000 (UTC)","user":{"_id":5,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Whitley Atkinson","phone":"+38 (895) 506-31-64"}},{"user_id":6,"is_active":false,"balance":892,"diagnosis":"маска","time":"14:48","date":"Thu Feb 25 2021 11:52:23 GMT+0000 (UTC)","user":{"_id":6,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Houston George","phone":"+38 (967) 528-34-55"}}]},{"title":"14 февраля","data":[{"user_id":1,"is_active":false,"balance":852,"diagnosis":"массаж лица","time":"20:22","date":"Thu Feb 11 2021 14:23:26 GMT+0000 (UTC)","user":{"_id":1,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Ferguson Lowery","phone":"+38 (931) 469-20-19"}},{"user_id":2,"is_active":true,"balance":615,"diagnosis":"массаж лица","time":"14:30","date":"Thu Feb 25 2021 14:05:09 GMT+0000 (UTC)","user":{"_id":2,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Jordan Rocha","phone":"+38 (843) 572-24-25"}},{"user_id":3,"is_active":true,"balance":926,"diagnosis":"комбинированная чистка","time":"15:49","date":"Sat Feb 20 2021 17:16:13 GMT+0000 (UTC)","user":{"_id":3,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Shannon Vinson","phone":"+38 (905) 598-30-35"}},{"user_id":4,"is_active":true,"balance":663,"diagnosis":"массаж лица","time":"15:24","date":"Sun Feb 28 2021 00:14:42 GMT+0000 (UTC)","user":{"_id":4,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Dale Burt","phone":"+38 (839) 452-29-92"}},{"user_id":5,"is_active":false,"balance":704,"diagnosis":"маска","time":"12:30","date":"Wed Feb 24 2021 23:00:44 GMT+0000 (UTC)","user":{"_id":5,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Whitley Atkinson","phone":"+38 (895) 506-31-64"}},{"user_id":6,"is_active":false,"balance":892,"diagnosis":"маска","time":"14:48","date":"Thu Feb 25 2021 11:52:23 GMT+0000 (UTC)","user":{"_id":6,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Houston George","phone":"+38 (967) 528-34-55"}}]},{"title":"27 февраля","data":[{"user_id":1,"is_active":false,"balance":852,"diagnosis":"массаж лица","time":"20:22","date":"Thu Feb 11 2021 14:23:26 GMT+0000 (UTC)","user":{"_id":1,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Ferguson Lowery","phone":"+38 (931) 469-20-19"}},{"user_id":2,"is_active":true,"balance":615,"diagnosis":"массаж лица","time":"14:30","date":"Thu Feb 25 2021 14:05:09 GMT+0000 (UTC)","user":{"_id":2,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Jordan Rocha","phone":"+38 (843) 572-24-25"}},{"user_id":3,"is_active":true,"balance":926,"diagnosis":"комбинированная чистка","time":"15:49","date":"Sat Feb 20 2021 17:16:13 GMT+0000 (UTC)","user":{"_id":3,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Shannon Vinson","phone":"+38 (905) 598-30-35"}},{"user_id":4,"is_active":true,"balance":663,"diagnosis":"массаж лица","time":"15:24","date":"Sun Feb 28 2021 00:14:42 GMT+0000 (UTC)","user":{"_id":4,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Dale Burt","phone":"+38 (839) 452-29-92"}},{"user_id":5,"is_active":false,"balance":704,"diagnosis":"маска","time":"12:30","date":"Wed Feb 24 2021 23:00:44 GMT+0000 (UTC)","user":{"_id":5,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Whitley Atkinson","phone":"+38 (895) 506-31-64"}},{"user_id":6,"is_active":false,"balance":892,"diagnosis":"маска","time":"14:48","date":"Thu Feb 25 2021 11:52:23 GMT+0000 (UTC)","user":{"_id":6,"avatar":"https://source.unsplash.com/random/100x100?face","fullname":"Houston George","phone":"+38 (967) 528-34-55"}}]}]


            });

};

AppointmentController.prototype = {
    all,
    create,
    remove,
    update
}

module.exports = AppointmentController;
