const { json } = require('express');
const Joi = require('joi');

module.exports.bookSchema = Joi.object({
    book : Joi.object({
        title : Joi.string().required(),
        author : Joi.string().required(),
        publishedYear : Joi.number().required().min(1700),
        price : Joi.number().required().min(0),
        genre : Joi.string().required(),
    }).required()
});


