const validator = require('validator').default;
const helpers = require('../../../helpers');
const db = require('../../../models');
const userValidations = require('../../../validators/user.validations');
const enums = require('../../../enums/enums');
const dbEnums = require('../../../enums/db.models');
// const adminUserHelper = require('../../../helpers/v1/admin/users.helpers');
const userDesc = require("../../../enums/responses.desc");
const adminUserHelper = require('../../../helpers/v1/admin/users.helper');
const  Op =require("sequelize");
module.exports = (db, logger) => ({
    post: async (req, res) => {
        const body = req.body;
        const errors = userValidations.validateHrRegData(body);
        //Error return
        if (errors.length > 0) {
            res.statusCode = enums.statusCodes.badRequest;;
            return res.json(helpers.sendErrorJson(enums.statusCodes.badRequest, errors));
        }
    
        try {

            let userJson = req.body;
            userJson[enums.params.roleId]=enums.roleId.hr
            let [useCre,created] = await db.user.findOrCreate({
              where: {
                email: body.email
              },
              defaults: userJson
            });
            if (!created) {
                const errorResp = helpers.createError(enums.params.email, userDesc.emailAlreadyExist, enums.errorTypes.conflict);
                res.statusCode = 403;
                return res.json(helpers.sendErrorJson(enums.statusCodes.conflict, [errorResp]));
            }

            return res.json(helpers.sendJson(useCre));
        } catch (err) {
            const seqError = (err.errors && err.errors.length > 0) ? err.errors[0] : err;
            const errorResp = helpers.createError(seqError.path, seqError.message, seqError.type);
            res.statusCode = 500;
            return res.json(helpers.sendErrorJson(enums.statusCodes.internalServerError, [errorResp]));
        }
    },
    getUsers: async (req, res) => {
        const headers = req.headers;
        const query = headers['query'];
        const limit = parseInt(headers['limit']);
        const offset = parseInt(headers['offset']);
        const sortFieldName = (headers.sortFieldName)? headers.sortFieldName : 'createdAt' ;
        const sortOrder = (headers.sortOrder) ? headers.sortOrder : 'desc';

        const errors = userValidations.validateAdminUserGetData(limit,offset);
        if (errors && errors.length > 0) {
            res.statusCode = enums.statusCodes.badRequest;;
            return res.json(helpers.sendErrorJson(enums.statusCodes.badRequest, errors));
        }
    
        try {
        
            const results = await db[dbEnums.user].findAndCountAll({
                where: {
                    roleId:[enums.roleId.client,enums.roleId.hr]
                    
                  },
                limit:limit,
                offset:offset,
                order: [
                  [sortFieldName, sortOrder]
              ] 
            });

            return res.json(helpers.sendJson(adminUserHelper.generateUsersAdminGetResponse(limit,offset,query,results)));
        } catch (err) {
            const seqError = (err.errors && err.errors.length > 0) ? err.errors[0] : err;
            const errorResp = helpers.createError(seqError.path, seqError.message, seqError.type);
            res.statusCode = 500;
            return res.json(helpers.sendErrorJson(enums.statusCodes.internalServerError, [errorResp]));
        }
    }
});
