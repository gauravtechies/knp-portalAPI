'use strict'





const errorTypes = {
  validation: 'validation',
  unAuthorized: 'UnAuthorized',
  serverError: 'server_error',
  error: 'error',
  length: 'length',
  conflict: 'alreadyExist',
  notFound:'notFound'
};


const statusCodes = {
  ok: '200',
  unAuthorized: '401',
  badRequest: '403',
  internalServerError: '500',
  notFound: '404',
  conflict:'409'
};


const params = {
 
  companyName:"companyName",
  email: 'email',
  password: 'password',
  roleId:'roleId',
  jobTitle:'jobTitle',
  jobDescription:'jobDescription',
  userId:'userId',
  hrId:'hrId'
};


const responseContentTypes = {
  json: 'json'
};


const users = {
  admin:'admin',
  user:'user'
};

const roleId = {
  admin:1,
  hr:2,
  client:3
};


module.exports = {
  errorTypes,
  statusCodes,
  params,
  responseContentTypes,
  users,
  roleId
};
