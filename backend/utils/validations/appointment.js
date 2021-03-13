const {check} = require('express-validator');

const checks = [
    check('clientId').notEmpty(),
    check('diagnosis').isLength({min: 1, max: 1000}),
    check('procedure').isLength({min: 1, max: 1000}),
    check('price').isInt(),
    check('date').notEmpty(),
    check('time').notEmpty()
];
const validation = {
    create: [...checks],
    update: [...checks],
};

module.exports = validation;

