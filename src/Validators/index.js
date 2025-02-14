const Joi = require('joi');
const joiDate = require('@joi/date');
const joi = Joi.extend(joiDate);

module.exports = () => {

  const sales = require('./sales')(joi);

  return {
    sales
  }
}