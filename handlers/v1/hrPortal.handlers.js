const validator = require('validator').default;
const helpers = require('../../helpers');
const db = require('../../models');
const userValidations = require('../../validators/user.validations');
const enums = require('../../enums/enums');
const dbEnums = require('../../enums/db.models');
// const adminUserHelper = require('../../../helpers/v1/admin/users.helpers');
const userDesc = require("../../enums/responses.desc");
const hePortalHelper = require('../../helpers/hrPortalHelper');

module.exports = (db, logger) => ({
    
    getAssignedJobs: async (req, res) => {
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
            let authorizedUser=req.user;
            console.log(authorizedUser);
            const results = await db[dbEnums.jobs].findAndCountAll({
                where: {
                    hrId:authorizedUser.id
                },
                limit:limit,
                offset:offset,
                order: [
                  [sortFieldName, sortOrder]
              ],
              include:[
                    {

                        model:db[dbEnums.user],as: "client",
                        attributes:['email','companyName'],
                        seperate:true
                    }
                ],
                raw:true

            });
            return res.json(helpers.sendJson(hePortalHelper.generateHrportalGetResponse(limit,offset,query,results)));
        } catch (err) {
            const seqError = (err.errors && err.errors.length > 0) ? err.errors[0] : err;
            const errorResp = helpers.createError(seqError.path, seqError.message, seqError.type);
            res.statusCode = 500;
            return res.json(helpers.sendErrorJson(enums.statusCodes.internalServerError, [errorResp]));
        }
    },
    updateNote: async(req, res, next) => {
        let body=req.body;
        let errors = userValidations.validateNote(body);
        //Validation
        if (errors.length > 0) {
          return  res.status(enums.statusCodes.badRequest).send(helpers.sendErrorJson(enums.statusCodes.badRequest, errors));
        }
        try{
            let authorizedUser=req.user;
            //Check if given hr can change note for given job id 
            const niceUser = await db[dbEnums.jobs].findOne({ where: { id: req.params.jobId,hrId:authorizedUser.id } });
            if(niceUser==null){
                const errorResp = helpers.createError(enums.params.email, userDesc.notAuthorised, enums.errorTypes.notFound);
                return res.json(helpers.sendErrorJson(enums.statusCodes.notFound, [errorResp]));
            }
            //Update Note
            await db[dbEnums.jobs].update({
                    note: validator.escape(body[enums.params.note])
    
              },{
                  where:{
                    id:req.params.jobId
                  }
              });
            return res.json(helpers.sendJson(body));
        }catch(err){
            //Internal server error
            console.log(err);
            const seqError = (err.errors && err.errors.length > 0) ? err.errors[0] : err;
            const errorResp = helpers.createError(seqError.path, seqError.message, seqError.type);
            return res.status(enums.statusCodes.internalServerError).send(helpers.sendErrorJson(enums.statusCodes.internalServerError, [errorResp]));
        }
    },
});
