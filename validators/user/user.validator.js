const Joi = require('joi');

const {genderEnum, regexEnum} = require("../../constants");
const {phoneValidator, emailValidator, passwordValidator} = require("../common/common.validator");

module.exports = {
  newUserValidator: Joi.object({
    name: Joi.string().regex(regexEnum.NAME_USER).trim(true).min(2).max(30).required(),
    surname: Joi.string().regex(regexEnum.NAME_USER).trim(true).min(2).max(30).required(),
    gender: Joi.string().valid(...Object.values(genderEnum)).trim().required(),
    phone: phoneValidator.required(),
    age: Joi.number().integer().min(1).max(120),
    email: emailValidator.required(),
    password: passwordValidator.required(),
  }),

  updateUserValidator: Joi.object({
    name: Joi.string().regex(regexEnum.NAME_USER).trim(true).min(2).max(30),
    surname: Joi.string().regex(regexEnum.NAME_USER).trim(true).min(2).max(30),
    gender: Joi.string().valid(...Object.values(genderEnum)).trim(),
    age: Joi.number().integer().min(1).max(120),
    phone: phoneValidator,
  }),
};



