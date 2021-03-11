const {check} = require('express-validator');

const validation = {
    create: [
        check('client').isLength({min: 3, max: 50}),
        check('diagnosis').isLength({min: 1, max: 50}),
        check('price').isInt({min: 0, max: 5000}),
        check('date').isLength({min: 3, max: 50}),
        check('time').isLength({min: 4, max: 12})
    ],
    update: [
        check('diagnosis').isLength({min: 1, max: 50}),
        check('price').isInt({min: 0, max: 5000}),
        check('date').isLength({min: 3, max: 50}),
        check('time').isLength({min: 4, max: 12})

    ]
};

module.exports = validation;
