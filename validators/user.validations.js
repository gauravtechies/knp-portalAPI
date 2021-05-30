const commonValidations = require('./index');
const enums = require('../enums/enums');
//Registration validation
exports.validateRegData = body => {
  const error = [];
  commonValidations.validateInternal(commonValidations.email(body[enums.params.email]), error);
  commonValidations.validateInternal(commonValidations.companyName(body[enums.params.companyName]), error);
  commonValidations.validateInternal(commonValidations.password(body[enums.params.password]), error);

  return error;
};
//Validate Hr reg data 
exports.validateHrRegData = body => {
  const error = [];
  commonValidations.validateInternal(commonValidations.email(body[enums.params.email]), error);
  commonValidations.validateInternal(commonValidations.password(body[enums.params.password]), error);

  return error;
};

//User fetch
exports.validateAdminUserGetData = (limit, offset) => {
  const error = [];
  commonValidations.validateInternal(commonValidations.isLimit(limit), error);
  commonValidations.validateInternal(commonValidations.isOffset(offset),error);
  return error;
}



//Validation for creating job
exports.validateCreateJob = body => {
  const error = [];
  commonValidations.validateInternal(commonValidations.title(body[enums.params.jobName]), error);
  commonValidations.validateInternal(commonValidations.description(body[enums.params.description]), error);
 
  return error;
};


//create NOte


exports.validateNote = body => {
  const error = [];
  commonValidations.validateInternal(commonValidations.description(body[enums.params.note]), error);
 
  return error;
};

