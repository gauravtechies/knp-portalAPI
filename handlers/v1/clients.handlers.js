const validator = require('validator').default;
const helpers = require('../../helpers');
const db = require('../../models');
const userValidations = require('../../validators/user.validations');
const enums = require('../../enums/enums');
const dbEnums = require('../../enums/db.models');
// const adminUserHelper = require('../../../helpers/v1/admin/users.helpers');
const userDesc = require("../../enums/responses.desc");

module.exports = (db, logger) => ({
    post: async (req, res) => {
        const body = req.body;
        const errors = userValidations.validateRegData(body);

        if (errors.length > 0) {
            res.statusCode = enums.statusCodes.badRequest;;
            return res.json(helpers.sendErrorJson(enums.statusCodes.badRequest, errors));
        }
    
        try {

            let userJson = req.body;
            
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
    createJob: async(req, res, next) => {
        let body=req.body;
        let errors = userValidations.validateCreateJob(body);
        //Validation
        if (errors.length > 0) {
          return  res.status(enums.statusCodes.badRequest).send(helpers.sendErrorJson(enums.statusCodes.badRequest, errors));
        }
        try{
            //Find rows for pmp structure
            let  allHr = await db[dbEnums.user].findAll({
                where:{
                    roleId:enums.roleId.hr
                },
                raw:true,
                attributes: ['id']
            });
            arrayAllHr = allHr.map(function (obj) {
                return obj.id;
              });
            
            let randomValue = arrayAllHr[Math.floor(Math.random() * arrayAllHr.length)];
            //user from token
            let authorizedUser=req.user;
            //Inserting user id in body 
            body[enums.params.userId]=authorizedUser.id;
            body[enums.params.hrId]=randomValue;
            let jobCreated = await db[dbEnums.jobs].create(body);
            delete body.userId;
            // Pmp master id 
           return res.json(helpers.sendJson(body));
        }catch(err){
            //Internal server error
            console.log(err);
            const seqError = (err.errors && err.errors.length > 0) ? err.errors[0] : err;
            const errorResp = helpers.createError(seqError.path, seqError.message, seqError.type);
            return res.status(enums.statusCodes.internalServerError).send(helpers.sendErrorJson(enums.statusCodes.internalServerError, [errorResp]));
        }
    }


});
