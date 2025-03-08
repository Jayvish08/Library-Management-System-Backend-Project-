const Joi = require('joi');

module.exports.bookSchema = Joi.object({
        title : Joi.string().required(),
        author : Joi.string().required(),
        publishedYear : Joi.number().required().min(1700),
        price : Joi.number().required().min(0),
        genre : Joi.string().required(),
    }).required();

module.exports.authorSchema = Joi.object({
        name : Joi.string().required(),
        bio : Joi.string().required(),
        birthYear : Joi.number().required().min(1700),
        nationality : Joi.string().required(),
        books: Joi.array()
    }).required();

    module.exports.loanSchema = Joi.object({
        books : Joi.array().required(),
        userId : Joi.string().required(),
        loanDate : Joi.date(),
        returnDate: Joi.date(),
        status: Joi.string()
    }).required();

    module.exports.reviewSchema = Joi.object({
        book: Joi.string().required(),
        user: Joi.string().required(),
        rating : Joi.number().required(),
        comment: Joi.string().required()
    }).required();