const validator = require('validator');
const helpers = require('../helpers');
const userDesc = require('../enums/responses.desc');
const enums = require('../enums/enums');

const isNullOrEmpty = data => {
  if (data && data != null && !validator.isEmpty(data.toString())) {
    return false;
  }

  return true;
};

// const isNullOrEmptyDirect = data =>{
//   if(isNullOrEmpty(data)){
//     return 'isNull';
//   }
//   return null;
// }

exports.isNullOrEmpty = isNullOrEmpty;
// exports.isNullOrEmptyDirect = isNullOrEmptyDirect;

const isBoolean = data => {
  if (!isNullOrEmpty(data)) {
    if (data === 1 || data === true || data === 'true') {
      return true;
    }
  }
  return false;
};
exports.isBoolean = isBoolean;


const isBooleanReal = data => {
  if (data != null && !validator.isEmpty(data.toString())) {
    if (data === 1 || data === true || data === 'true' ||
    data === 0 || data === false || data === 'false') {
      return true;
    }
  }
  return false;
};

exports.validateInternal = (data, accu) => {
  if (data != null) accu.push(data);
};

// email knp
exports.email = email => {
  if (isNullOrEmpty(email)) {
    return helpers.createError(enums.params.email, userDesc.emailIsEmpty, enums.errorTypes.validation);
  }
  if (!validator.default.isEmail(email)) {
    return helpers.createError(enums.params.email, userDesc.emailIsInvalid, enums.errorTypes.validation);
  }
  return null;
};
//knp
exports.companyName = companyName => {
  if (isNullOrEmpty(companyName)) {
    return helpers.createError(enums.params.companyName, userDesc.companyNameEmpty, enums.errorTypes.validation);
  }
  return null;
};
//knp
exports.password = password => {
  if (isNullOrEmpty(password)) {
    return helpers.createError(enums.params.password, userDesc.passwordIsEmpty, enums.errorTypes.validation);
  }
  if (password.length < 4) {
    return helpers.createError(enums.params.password, userDesc.passwordIsInvalid, enums.errorTypes.validation);
  }
  return null;
};

//knp
exports.title = title => {
  if (isNullOrEmpty(title)) {
    return helpers.createError(enums.params.jobName, userDesc.jobNameEmpty, enums.errorTypes.validation);
  }
  return null;
};

//knp
exports.description = description => {

  if (isNullOrEmpty(description)) {
    return helpers.createError(enums.params.description, userDesc.descriptionIsEmpty, enums.errorTypes.validation);
  }
  return null;
};
//knp
exports.note = note => {

  if (isNullOrEmpty(note)) {
    return helpers.createError(enums.params.note, userDesc.note, enums.errorTypes.validation);
  }
  return null;
};


exports.isToken = token => {
  if(isNullOrEmpty(token)){
    return helpers.createError(enums.params.token,userDesc.tokenNotValid,enums.errorTypes.validation);
  }
  return null;
}



//knp
exports.isLimit = limit => {
  if(isNaN(limit)){
    return helpers.createError(enums.params.limit,userDesc.limit,enums.errorTypes.validation);
  }
  return null;
}
//isOffset
exports.isOffset = offset => {
  if(isNaN(offset)){
    return helpers.createError(enums.params.offset,userDesc.offset,enums.errorTypes.validation);
  }
  return null;
}



